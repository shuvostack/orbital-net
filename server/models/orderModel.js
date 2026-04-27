const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    cartItems: { type: Array, required: true }, 
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, 
    transactionId: { type: String },
    paymentStatus: { type: String, default: 'Pending' }, 
    
    // order status for admin panel
    status: { 
      type: String, 
      enum: ['Pending', 'Processing', 'Completed', 'Cancelled'], 
      default: 'Pending' 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);