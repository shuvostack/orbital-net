const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, updateAdminPassword } = require('../controllers/settingController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getSettings) 
  .put(protect, admin, updateSettings); 

router.route('/password')
  .put(protect, admin, updateAdminPassword);

module.exports = router;