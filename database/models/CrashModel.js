const mongoose = require('mongoose');

const CrashSchema = mongoose.Schema({
  carId: { type: mongoose.Schema.ObjectId, ref: 'Car' },
  message: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

exports.CrashModel = mongoose.model('Crash', CrashSchema);
