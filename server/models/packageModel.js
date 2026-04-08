const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true, 
    },
    speed: {
      type: Number,
      required: [true, 'Speed amount is required'],
    },
    speedUnit: {
      type: String,
      default: 'Mbps',
    },
    price: {
      type: Number,
      required: [true, 'Package price is required'],
    },
    category: {
      type: String,
      enum: ['Home', 'Corporate', 'Dedicated'],
      default: 'Home',
    },
    features: [
      {
        type: String, 
      },
    ],
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;