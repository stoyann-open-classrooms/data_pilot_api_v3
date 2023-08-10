const mongoose = require('mongoose');

const RapportSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  title: {
    type : String,
    required: true
  },
  rapport: {
    type: String,
    required: true,
  },
 frame: {
    type: String
 }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Rapport', RapportSchema);
