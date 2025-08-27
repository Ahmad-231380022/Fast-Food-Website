const Settings = require('../models/Settings');
const { asyncHandler } = require('../utils/asyncHandler');

async function ensureSettings() {
  const existing = await Settings.findOne();
  if (existing) return existing;
  return Settings.create({});
}

exports.get = asyncHandler(async (req, res) => {
  const settings = await ensureSettings();
  res.json({ settings });
});

exports.update = asyncHandler(async (req, res) => {
  const settings = await ensureSettings();
  const allowed = ['taxPercent', 'deliveryCharge', 'discounts'];
  for (const key of allowed) {
    if (typeof req.body[key] !== 'undefined') settings[key] = req.body[key];
  }
  await settings.save();
  res.json({ settings });
});

