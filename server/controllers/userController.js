const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin',
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'ইউজার খুঁজে পাওয়া যায়নি' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const seedAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({ email: 'admin@orbital.com' });

    if (adminExists) {
      return res.status(400).json({ message: 'অ্যাডমিন আগেই তৈরি করা আছে!' });
    }

    const adminUser = new User({
      name: 'Super Admin',
      email: 'admin@orbital.com',
      password: 'password123', 
      role: 'admin',
    });

    await adminUser.save();
    
    res.status(201).json({ 
      message: 'ম্যাজিক! অ্যাডমিন সফলভাবে তৈরি হয়েছে।', 
      email: 'admin@orbital.com', 
      password: 'password123' 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authUser,
  getUserProfile,
  seedAdmin,
};