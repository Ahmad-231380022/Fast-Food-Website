const SupportTicket = require('../models/SupportTicket');
const { asyncHandler } = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) return res.status(400).json({ message: 'subject and message required' });
  const ticket = await SupportTicket.create({ customer: req.user.id, subject, message });
  res.status(201).json({ ticket });
});

exports.mine = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find({ customer: req.user.id }).sort({ createdAt: -1 });
  res.json({ tickets });
});

exports.listAll = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find().populate('customer', 'name email').sort({ createdAt: -1 });
  res.json({ tickets });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!ticket) return res.status(404).json({ message: 'Not found' });
  res.json({ ticket });
});

