const express = require('express');
const {
  getPermissions,
  createPermission,
  getPermission,
  updatePermission,
  deletePermission,
} = require('../controllers/permissionRapports');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const PermissionRapport = require('../models/PermissionRapport');

// Uncomment these lines if you need to protect and authorize routes
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(PermissionRapport), getPermissions)
  .post(createPermission);

router
  .route('/:id')
  .get(getPermission)
  .put(updatePermission)
  .delete(deletePermission);

module.exports = router;
