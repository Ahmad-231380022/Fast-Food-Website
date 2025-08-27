const Order = require('../models/Order');
const Product = require('../models/Product');
const { asyncHandler } = require('../utils/asyncHandler');
const { ORDER_STATUS, PAYMENT_METHOD } = require('../config/constants');
const PDFDocument = require('pdfkit');

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

exports.create = asyncHandler(async (req, res) => {
  const { items, paymentMethod, walkIn } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items required' });
  }

  const populated = [];
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) return res.status(400).json({ message: 'Invalid product' });
    const quantity = Math.max(1, item.quantity || 1);
    populated.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
    });
  }

  const total = calculateTotal(populated);
  const base = {
    items: populated,
    paymentMethod: paymentMethod || PAYMENT_METHOD.COD,
    total,
  };
  if (walkIn) {
    base.walkIn = true;
    base.cashier = req.user?.id;
  } else {
    base.customer = req.user?.id;
  }
  const order = await Order.create(base);
  res.status(201).json({ order });
});

exports.list = asyncHandler(async (req, res) => {
  const { status, mine } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (mine) filter.customer = req.user.id;
  const orders = await Order.find(filter).sort({ createdAt: -1 }).populate('customer', 'name email');
  res.json({ orders });
});

exports.get = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json({ order });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!Object.values(ORDER_STATUS).includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json({ order });
});

exports.markPaid = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { isPaid: true, paidAt: new Date() },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json({ order });
});

exports.approve = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: ORDER_STATUS.PREPARING },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json({ order });
});

exports.reject = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: ORDER_STATUS.CANCELLED },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json({ order });
});

exports.receiptPdf = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=receipt-${order._id}.pdf`);
  doc.fontSize(16).text('FastFoodHouse Receipt', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Order: ${order._id}`);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
  doc.text(`Payment: ${order.paymentMethod.toUpperCase()}  Paid: ${order.isPaid ? 'Yes' : 'No'}`);
  doc.moveDown();
  order.items.forEach((it) => {
    doc.text(`${it.name} x${it.quantity}  @ $${it.price.toFixed(2)}  = $${it.subtotal.toFixed(2)}`);
  });
  doc.moveDown();
  doc.fontSize(14).text(`Total: $${order.total.toFixed(2)}`, { align: 'right' });
  doc.end();
  doc.pipe(res);
});

