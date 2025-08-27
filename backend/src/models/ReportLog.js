const mongoose = require('mongoose');

const reportLogSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    format: { type: String, enum: ['pdf', 'xlsx'], required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    params: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReportLog', reportLogSchema);

