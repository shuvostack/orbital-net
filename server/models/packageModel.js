const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    speed: {
      type: String, 
      required: [true, 'Speed is required'],
    },
    price: {
      type: Number,
      required: [true, 'Package price is required'],
    },
    type: {
      type: String, 
      default: 'Broadband',
    },
    popular: {
      type: Boolean, 
      default: false,
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