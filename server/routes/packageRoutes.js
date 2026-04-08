const express = require('express');
const router = express.Router();
const { getPackages, createPackage } = require('../controllers/packageController');
const { protect, admin } = require('../middlewares/authMiddleware'); 

// Chain logic
router.route('/')
  .get(getPackages)
  .post(protect, admin, createPackage);

module.exports = router;