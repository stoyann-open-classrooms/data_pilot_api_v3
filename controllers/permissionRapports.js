const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const PermissionRapport = require('../models/PermissionRapport');

// @desc      Create permission
// @route     POST /api/v1/permissions
// @access    Private/Admin
exports.createPermission = asyncHandler(async (req, res, next) => {
  const permission = await PermissionRapport.create(req.body);
  res.status(201).json({
    success: true,
    data: permission,
  });
});

// @desc      Get permissions
// @route     GET /api/v1/permissions
// @access    Private
exports.getPermissions = asyncHandler(async (req, res, next) => {
  const permissions = await PermissionRapport.find().populate('user rapport');
  res.status(200).json({
    success: true,
    data: permissions,
  });
});

// @desc      Get single permission
// @route     GET /api/v1/permissions/:id
// @access    Private
exports.getPermission = asyncHandler(async (req, res, next) => {
  const permission = await PermissionRapport.findById(req.params.id).populate('user rapport');
  if (!permission) {
    return next(
      new ErrorResponse(`Permission not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: permission,
  });
});

// @desc      Update permission
// @route     PUT /api/v1/permissions/:id
// @access    Private/Admin
exports.updatePermission = asyncHandler(async (req, res, next) => {
  let permission = await PermissionRapport.findById(req.params.id);

  if (!permission) {
    return next(
      new ErrorResponse(`Permission not found with id of ${req.params.id}`, 404)
    );
  }

  permission = await PermissionRapport.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: permission,
  });
});

// @desc      Delete permission
// @route     DELETE /api/v1/permissions/:id
// @access    Private/Admin
exports.deletePermission = asyncHandler(async (req, res, next) => {
  const permission = await PermissionRapport.findById(req.params.id);

  if (!permission) {
    return next(
      new ErrorResponse(`Permission not found with id of ${req.params.id}`, 404)
    );
  }

  await permission.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
