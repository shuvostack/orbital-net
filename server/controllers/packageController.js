const Package = require('../models/packageModel');


const getPackages = async (req, res, next) => {
  try {
    // Receive active package from database
    const packages = await Package.find({ isActive: true });
    res.json(packages);
  } catch (error) {
    next(error);
  }
};



const createPackage = async (req, res, next) => {
  try {
    const { name, speed, speedUnit, price, category, features } = req.body;

    const newPackage = new Package({
      name,
      speed,
      speedUnit,
      price,
      category,
      features,
    });

    const createdPackage = await newPackage.save();
    res.status(201).json(createdPackage);
  } catch (error) {
    res.status(400);
    next(new Error('Invalid package data: ' + error.message));
  }
};

module.exports = { getPackages, createPackage };