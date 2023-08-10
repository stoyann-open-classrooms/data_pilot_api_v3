const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Rapport = require('../models/Rapport');

// @desc      Create rapport
// @route     POST /api/v1/rapports
// @access    Private/Admin
exports.createRapport = asyncHandler(async (req, res, next) => {
  const rapport = await Rapport.create(req.body);

  res.status(201).json({
    success: true,
    data: rapport,
  });
});

// @desc      Get rapports
// @route     GET /api/v1/rapports
// @access    Private
exports.getRapports = asyncHandler(async (req, res, next) => {
  const rapports = await Rapport.find();

  res.status(200).json({
    success: true,
    data: rapports,
  });
});

// @desc      Get rapport
// @route     GET /api/v1/rapports/:id
// @access    Private
exports.getRapport = asyncHandler(async (req, res, next) => {
  const rapport = await Rapport.findById(req.params.id);

  if (!rapport) {
    return next(
      new ErrorResponse(`Rapport not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: rapport,
  });
});

// @desc      Update rapport
// @route     PUT /api/v1/rapports/:id
// @access    Private/Admin
exports.updateRapport = asyncHandler(async (req, res, next) => {
  let rapport = await Rapport.findById(req.params.id);

  if (!rapport) {
    return next(
      new ErrorResponse(`Rapport not found with id of ${req.params.id}`, 404)
    );
  }

  rapport = await Rapport.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: rapport,
  });
});

// @desc      Delete rapport
// @route     DELETE /api/v1/rapports/:id
// @access    Private/Admin
exports.deleteRapport = asyncHandler(async (req, res, next) => {
  const rapport = await Rapport.findById(req.params.id);

  if (!rapport) {
    return next(
      new ErrorResponse(`Rapport not found with id of ${req.params.id}`, 404)
    );
  }

  await rapport.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
