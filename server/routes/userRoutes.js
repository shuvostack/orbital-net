const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, seedAdmin } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// admin routes 
router.get('/seed', seedAdmin);
router.post('/login', authUser);

// Protected Route 
router.get('/profile', protect, getUserProfile);

module.exports = router;