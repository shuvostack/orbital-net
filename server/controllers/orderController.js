const Order = require('../models/orderModel');
const SSLCommerzPayment = require('sslcommerz-lts');

// take data from .env
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = process.env.IS_LIVE === 'true'; 

// create new order and generate payment link
const createOrder = async (req, res, next) => {
  try {
    const { name, phone, address, cart, totalAmount, paymentMethod } = req.body;

    // create a unique Transaction ID
    const tran_id = `REF-${Date.now()}`;

    // save order to database as a pending
    const newOrder = new Order({
      customerName: name,
      phone,
      address,
      cartItems: cart,
      totalAmount,
      paymentMethod,
      transactionId: tran_id,
      paymentStatus: 'Pending',
    });
    await newOrder.save();

    // If Payment Method is "SSLCommerz" send payment get way
    if (paymentMethod === 'SSLCommerz') {
      const data = {
        total_amount: totalAmount,
        currency: 'BDT',
        tran_id: tran_id,
        // redirect
        success_url: `http://localhost:5000/api/orders/payment/success/${tran_id}`,
        fail_url: `http://localhost:5000/api/orders/payment/fail/${tran_id}`,
        cancel_url: `http://localhost:5000/api/orders/payment/cancel/${tran_id}`,
        ipn_url: `http://localhost:5000/api/orders/payment/ipn`,
        
        shipping_method: 'Courier',
        product_name: 'Hardware Products',
        product_category: 'Electronic',
        product_profile: 'general',
        
        cus_name: name,
        cus_email: 'customer@orbitalnet.com', 
        cus_add1: address,
        cus_city: 'Tangail',
        cus_country: 'Bangladesh',
        cus_phone: phone,
        
        ship_name: name,
        ship_add1: address,
        ship_city: 'Tangail',
        ship_country: 'Bangladesh',
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      
      sslcz.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        return res.status(200).json({ url: GatewayPageURL });
      }).catch(err => {
        return res.status(400).json({ message: 'SSLCommerz Initialization Failed' });
      });

    } else {
      return res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// after payment success, SSLCommerz will hit this api
const paymentSuccess = async (req, res) => {
  const { tran_id } = req.params;
  
  // make the status pending to paid in database
  await Order.updateOne({ transactionId: tran_id }, { paymentStatus: 'Paid' });

  // redirect to success page
  res.redirect(`http://localhost:3000/payment-success/${tran_id}`);
};

// if payment fail
const paymentFail = async (req, res) => {
  const { tran_id } = req.params;
  await Order.updateOne({ transactionId: tran_id }, { paymentStatus: 'Failed' });
  res.redirect(`http://localhost:3000/payment-fail`);
};

module.exports = { createOrder, paymentSuccess, paymentFail };