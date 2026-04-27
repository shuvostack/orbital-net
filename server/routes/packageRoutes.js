const express = require('express');
const router = express.Router();
const { getPackages, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect, admin } = require('../middlewares/authMiddleware'); 

// Chain logic
router.route('/')
  .get(getPackages)
  .post(protect, admin, createPackage);

// edit and delete route
router.route('/:id')
  .put(protect, admin, updatePackage)
  .delete(protect, admin, deletePackage);

module.exports = router;