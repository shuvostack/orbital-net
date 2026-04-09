const Product = require('../models/productModel');

// public
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    next(error);
  }
};


// Admin
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, countInStock, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      countInStock,
      imageUrl,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400);
    next(new Error('Invalid product data: ' + error.message));
  }
};

module.exports = { getProducts, createProduct };