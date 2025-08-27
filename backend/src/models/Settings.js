const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    taxPercent: { type: Number, default: Number(process.env.TAX_PERCENT || 0) },
    deliveryCharge: { type: Number, default: Number(process.env.DELIVERY_CHARGE || 0) },
    discounts: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);

