const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cartItems: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, 
  transactionId: { type: String, required: true }, 
  paymentStatus: { type: String, default: 'Pending' }, 
  orderStatus: { type: String, default: 'Processing' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;