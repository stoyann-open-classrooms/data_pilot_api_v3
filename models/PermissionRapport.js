const mongoose = require('mongoose');

const PermissionRapportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rapport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rapport',
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('PermissionRapport', PermissionRapportSchema);
