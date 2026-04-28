const Order = require("../models/orderModel");
const SSLCommerzPayment = require("sslcommerz-lts");

// take data from .env
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = process.env.IS_LIVE === "true";

// create new order and generate payment link (Public)
const createOrder = async (req, res, next) => {
  try {
    const { name, phone, address, cart, totalAmount, paymentMethod } = req.body;

    const tran_id = `REF-${Date.now()}`;

    const newOrder = new Order({
      customerName: name,
      phone,
      address,
      cartItems: cart,
      totalAmount,
      paymentMethod,
      transactionId: tran_id,
      paymentStatus: "Pending",
    });
    await newOrder.save();

    if (paymentMethod === "SSLCommerz") {
      const data = {
        total_amount: totalAmount,
        currency: "BDT",
        tran_id: tran_id,
        success_url: `https://orbital-backend-9y6q.onrender.com/api/orders/payment/success/${tran_id}`,
        fail_url: `https://orbital-backend-9y6q.onrender.com/api/orders/payment/fail/${tran_id}`,
        cancel_url: `https://orbital-backend-9y6q.onrender.com/api/orders/payment/cancel/${tran_id}`,
        ipn_url: `https://orbital-backend-9y6q.onrender.com/api/orders/payment/ipn`,
        shipping_method: "Courier",
        product_name: "Hardware Products",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: name,
        cus_email: "customer@orbitalnet.com",
        cus_add1: address,
        cus_city: "Tangail",
        cus_country: "Bangladesh",
        cus_phone: phone,
        ship_name: name,
        ship_add1: address,
        ship_city: "Tangail",
        ship_country: "Bangladesh",
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

      sslcz
        .init(data)
        .then((apiResponse) => {
          let GatewayPageURL = apiResponse.GatewayPageURL;
          return res.status(200).json({ url: GatewayPageURL });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ message: "SSLCommerz Initialization Failed" });
        });
    } else {
      return res
        .status(201)
        .json({ message: "Order placed successfully", order: newOrder });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// after payment success
const paymentSuccess = async (req, res) => {
  const { tran_id } = req.params;
  await Order.updateOne({ transactionId: tran_id }, { paymentStatus: "Paid" });
  res.redirect(`http://localhost:3000/payment-success/${tran_id}`);
};

// if payment fail
const paymentFail = async (req, res) => {
  const { tran_id } = req.params;
  await Order.updateOne(
    { transactionId: tran_id },
    { paymentStatus: "Failed" },
  );
  res.redirect(`http://localhost:3000/payment-fail`);
};

// ==========================================
// 💡 Admin Dashboard Functions
// ==========================================

// fetch all order (Admin)
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// update order status (Admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("অর্ডার পাওয়া যায়নি");
    }
  } catch (error) {
    next(error);
  }
};

// delete order (Admin)
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      res.json({ message: "অর্ডার ডিলিট করা হয়েছে" });
    } else {
      res.status(404);
      throw new Error("অর্ডার পাওয়া যায়নি");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  paymentSuccess,
  paymentFail,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};
