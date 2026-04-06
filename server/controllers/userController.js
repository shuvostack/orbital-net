const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check existing email
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Ei email diye already ekta account ache' });
    }

    // Create new user to database
    const user = await User.create({
      name,
      email,
      password, 
      phone,
      address,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find email from database
    const user = await User.findOne({ email });

    // If user exist and match password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email ba password vul diyecho' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  authUser,
};