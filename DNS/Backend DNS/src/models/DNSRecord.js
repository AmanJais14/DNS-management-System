const mongoose = require('mongoose');

const DNSRecordSchema = new mongoose.Schema({
  domain: { type: String, required: true, unique: true },
  recordType: { type: String, required: true },
  value: { type: String, required: true },
  ttl: { type: Number, default: 3600 }
});

module.exports = mongoose.model('DNSRecord', DNSRecordSchema);
