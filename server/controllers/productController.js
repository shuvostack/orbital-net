const Product = require('../models/productModel');

// get all product
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// get single product
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product && product.isActive) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// for admin panel
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


module.exports = { getProducts, getProductById, createProduct };