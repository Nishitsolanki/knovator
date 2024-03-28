const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  activeCount: { type: Number, default: 0 },
  inactiveCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Dashboard', dashboardSchema);