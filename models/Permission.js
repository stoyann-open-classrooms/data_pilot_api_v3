const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tableau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tableau',
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  write: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Permission', PermissionSchema);
