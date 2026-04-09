const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Router', 'ONU', 'Cable', 'Accessories', 'Others'],
    },
    countInStock: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 0,
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/300x300?text=No+Image', 
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;