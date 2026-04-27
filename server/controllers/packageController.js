const Package = require('../models/packageModel');

// get all package
const getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find({});
    res.json(packages);
  } catch (error) {
    next(error);
  }
};

// create new package
const createPackage = async (req, res, next) => {
  try {
    const { name, speed, price, type, popular, features } = req.body;

    const newPackage = new Package({
      name,
      speed,
      price,
      type,
      popular,
      features,
    });

    const createdPackage = await newPackage.save();
    res.status(201).json(createdPackage);
  } catch (error) {
    res.status(400);
    next(new Error('Invalid package data: ' + error.message));
  }
};

// update package
const updatePackage = async (req, res, next) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedPackage) {
      res.json(updatedPackage);
    } else {
      res.status(404);
      throw new Error('প্যাকেজ খুঁজে পাওয়া যায়নি');
    }
  } catch (error) {
    next(error);
  }
};

// delete package
const deletePackage = async (req, res, next) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (deletedPackage) {
      res.json({ message: 'প্যাকেজ ডিলিট করা হয়েছে' });
    } else {
      res.status(404);
      throw new Error('প্যাকেজ খুঁজে পাওয়া যায়নি');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getPackages, createPackage, updatePackage, deletePackage };