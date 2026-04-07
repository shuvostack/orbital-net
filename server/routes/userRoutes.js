const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes 
router.post('/', registerUser);
router.post('/login', authUser);

// Protected Route 
router.get('/profile', protect, getUserProfile);

module.exports = router;