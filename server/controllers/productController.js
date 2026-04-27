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

// create product for admin
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


// update product for admin
const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, countInStock, imageUrl } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      product.imageUrl = imageUrl || product.imageUrl;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('প্রোডাক্টটি খুঁজে পাওয়া যায়নি');
    }
  } catch (error) {
    next(error);
  }
};

// delete product for admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'প্রোডাক্ট সফলভাবে ডিলিট করা হয়েছে' });
    } else {
      res.status(404);
      throw new Error('প্রোডাক্টটি খুঁজে পাওয়া যায়নি');
    }
  } catch (error) {
    next(error);
  }
};


module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };