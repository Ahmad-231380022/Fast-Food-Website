const Product = require('../models/Product');
const { asyncHandler } = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const { category, q } = req.query;
  const filter = { isActive: true };
  if (category) filter.category = category;
  if (q) filter.name = { $regex: q, $options: 'i' };
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ products });
});

exports.get = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json({ product });
});

exports.create = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
});

exports.update = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json({ product });
});

exports.remove = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

exports.lowStock = asyncHandler(async (req, res) => {
  const threshold = Number(req.query.threshold || 10);
  const products = await Product.find({ stock: { $lte: threshold } }).sort({ stock: 1 });
  res.json({ products, threshold });
});

