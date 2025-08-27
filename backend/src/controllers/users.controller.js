const User = require('../models/User');
const { asyncHandler } = require('../utils/asyncHandler');
const { ROLES } = require('../config/constants');

exports.listAll = asyncHandler(async (req, res) => {
  const { role } = req.query;
  const filter = {};
  if (role) filter.role = role;
  const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
  res.json({ users });
});

exports.listStaff = asyncHandler(async (req, res) => {
  const staffRoles = [ROLES.CASHIER, ROLES.MANAGER];
  const users = await User.find({ role: { $in: staffRoles } }).select('-password');
  res.json({ users });
});

exports.updateRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!Object.values(ROLES).includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
});

exports.toggleActive = asyncHandler(async (req, res) => {
  const { isActive } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { isActive }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user });
});

exports.remove = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

exports.createCashier = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email, password required' });
  }
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already used' });
  const user = await User.create({ name, email, password, role: ROLES.CASHIER });
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

