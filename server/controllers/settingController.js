const Setting = require('../models/settingModel');
const User = require('../models/userModel'); // পাসওয়ার্ড চেঞ্জের জন্য লাগবে

// 💡 সেটিংস ফেচ করা (Public)
const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    // যদি ডাটাবেসে সেটিংস না থাকে, তাহলে ডিফল্ট একটা তৈরি করে নেবে
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// 💡 সেটিংস আপডেট করা (Admin)
const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (settings) {
      settings.phone = req.body.phone || settings.phone;
      settings.email = req.body.email || settings.email;
      settings.address = req.body.address || settings.address;
      settings.facebook = req.body.facebook || settings.facebook;
      settings.whatsapp = req.body.whatsapp || settings.whatsapp;
      settings.youtube = req.body.youtube || settings.youtube;
      
      // Boolean ভ্যালুর ক্ষেত্রে একটু সাবধানে হ্যান্ডেল করতে হয়
      if (req.body.maintenanceMode !== undefined) settings.maintenanceMode = req.body.maintenanceMode;
      if (req.body.acceptOrders !== undefined) settings.acceptOrders = req.body.acceptOrders;

      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      res.status(404);
      throw new Error('Settings not found');
    }
  } catch (error) {
    next(error);
  }
};

// 💡 অ্যাডমিন পাসওয়ার্ড চেঞ্জ করা (Admin)
const updateAdminPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id); // protect মিডলওয়্যার থেকে user আসবে
    if (user) {
      user.password = req.body.password;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getSettings, updateSettings, updateAdminPassword };