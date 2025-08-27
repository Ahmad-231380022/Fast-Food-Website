const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const Order = require('../models/Order');
const Product = require('../models/Product');
const ReportLog = require('../models/ReportLog');
const { asyncHandler } = require('../utils/asyncHandler');

async function aggregateSales({ from, to }) {
  const match = {};
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = new Date(from);
    if (to) match.createdAt.$lte = new Date(to);
  }
  const data = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        revenue: { $sum: '$total' },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return data.map((d) => ({ date: d._id, orders: d.orders, revenue: d.revenue }));
}

exports.salesJson = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const data = await aggregateSales({ from, to });
  res.json({ data });
});

exports.salesPdf = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const data = await aggregateSales({ from, to });
  await ReportLog.create({ type: 'sales', format: 'pdf', requestedBy: req.user?._id, params: { from, to } });
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="sales-report.pdf"');

  doc.fontSize(18).text('FastFoodHouse Sales Report', { align: 'center' });
  doc.moveDown();
  data.forEach((row) => {
    doc.fontSize(12).text(`${row.date}  |  Orders: ${row.orders}  |  Revenue: $${row.revenue.toFixed(2)}`);
  });
  doc.end();
  doc.pipe(res);
});

exports.salesXlsx = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const data = await aggregateSales({ from, to });
  await ReportLog.create({ type: 'sales', format: 'xlsx', requestedBy: req.user?._id, params: { from, to } });
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Sales');
  ws.addRow(['Date', 'Orders', 'Revenue']);
  data.forEach((row) => ws.addRow([row.date, row.orders, row.revenue]));
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="sales-report.xlsx"');
  await wb.xlsx.write(res);
  res.end();
});

exports.inventoryJson = asyncHandler(async (req, res) => {
  const products = await Product.find().select('name stock');
  res.json({ products });
});

