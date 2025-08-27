const User = require('../models/User');
const { asyncHandler } = require('../utils/asyncHandler');

exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
});

exports.updateMe = asyncHandler(async (req, res) => {
  const allowed = ['name', 'email', 'phone', 'address'];
  const update = {};
  for (const key of allowed) {
    if (typeof req.body[key] !== 'undefined') update[key] = req.body[key];
  }
  const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
  res.json({ user });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'currentPassword and newPassword required' });
  }
  const user = await User.findById(req.user.id).select('+password');
  const ok = await user.comparePassword(currentPassword);
  if (!ok) return res.status(400).json({ message: 'Current password incorrect' });
  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
});

