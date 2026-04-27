const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    // Website Information
    phone: { type: String, default: '+880 1XXXXXXXXX' },
    email: { type: String, default: 'support@orbitalnet.com' },
    address: { type: String, default: 'Tangail, Dhaka, Bangladesh' },
    
    // Social Media Links
    facebook: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    youtube: { type: String, default: '' },
    
    // Emergency Switches
    maintenanceMode: { type: Boolean, default: false },
    acceptOrders: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);