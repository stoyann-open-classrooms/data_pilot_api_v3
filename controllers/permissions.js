const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Authorization = require('../models/Permission');

// @desc      Create authorization
// @route     POST /api/v1/authorizations
// @access    Private/Admin
exports.createAuthorization = asyncHandler(async (req, res, next) => {
  const authorization = await Authorization.create(req.body);
  res.status(201).json({
    success: true,
    data: authorization,
  });
});

// @desc      Get authorizations
// @route     GET /api/v1/authorizations
// @access    Private
exports.getAuthorizations = asyncHandler(async (req, res, next) => {
  const authorizations = await Authorization.find().populate('user tableau');
  res.status(200).json({
    success: true,
    data: authorizations,
  });
});

// @desc      Get single authorization
// @route     GET /api/v1/authorizations/:id
// @access    Private
exports.getAuthorization = asyncHandler(async (req, res, next) => {
  const authorization = await Authorization.findById(req.params.id).populate('user tableau');
  if (!authorization) {
    return next(
      new ErrorResponse(`Authorization not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: authorization,
  });
});

// @desc      Update authorization
// @route     PUT /api/v1/authorizations/:id
// @access    Private/Admin
exports.updateAuthorization = asyncHandler(async (req, res, next) => {
  let authorization = await Authorization.findById(req.params.id);

  if (!authorization) {
    return next(
      new ErrorResponse(`Authorization not found with id of ${req.params.id}`, 404)
    );
  }

  authorization = await Authorization.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: authorization,
  });
});

// @desc      Delete authorization
// @route     DELETE /api/v1/authorizations/:id
// @access    Private/Admin
exports.deleteAuthorization = asyncHandler(async (req, res, next) => {
  const authorization = await Authorization.findById(req.params.id);

  if (!authorization) {
    return next(
      new ErrorResponse(`Authorization not found with id of ${req.params.id}`, 404)
    );
  }

  await authorization.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
