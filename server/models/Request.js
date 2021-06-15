const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  createdBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile',
    required:true
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile',
    required:true
  },
  start: Date,
  end: Date,
  accepted: {
    type: Boolean,
    default: false,
  },
  declined: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  payDetails: {
    paidAt: Date,
  },
});

module.exports = Request = mongoose.model('request', requestSchema);
