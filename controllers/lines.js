const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Tableau = require('../models/Table');
const Line = require('../models/Line');

// @desc    Get all lines
// @route   GET /api/v1/lines
// @access  Public
exports.getLines = asyncHandler(async (req, res, next) => {
  const lines = await Line.find();
  res.status(200).json({ success: true, data: lines });
});

// @desc    Get lines for a specific table
// @route   GET /api/v1/tables/:tableauId/lines
// @access  Public
exports.getLinesForTable = asyncHandler(async (req, res, next) => {
  console.log("Getting lines for tableau ID:", req.params.tableauId); // Log the tableau ID

  const lines = await Line.find({ tableau: req.params.tableauId });

  if (!lines || lines.length === 0) {
    console.log(`No lines found for tableau with id of ${req.params.tableauId}`); // Log if no lines found
    return next(
      new ErrorResponse(`No lines found for the tableau with id of ${req.params.tableauId}`, 404)
    );
  }

  console.log(`Found ${lines.length} lines for tableau with id of ${req.params.tableauId}`); // Log the number of lines found
  res.status(200).json({ success: true, data: lines });
});


// @desc    Get single line
// @route   GET /api/v1/lines/:id
// @access  Public
exports.getLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findById(req.params.id);

  if (!line) {
    return next(
      new ErrorResponse(`No line found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: line });
});


// @desc      Create line
// @route     POST /api/v1/lines/create
// @access    Private/Admin
exports.createLine = asyncHandler(async (req, res, next) => {
 
  const line = await Line.create(req.body);

  res.status(201).json({
    success: true,
    data: line,
  });
});

// @desc    Update line
// @route   PUT /api/v1/lines/:id
// @access  Private
exports.updateLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!line) {
    return next(
      new ErrorResponse(`No line with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: line });
});

// @desc    Delete line
// @route   DELETE /api/v1/lines/:id
// @access  Private
exports.deleteLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findByIdAndDelete(req.params.id);

  if (!line) {
    return next(
      new ErrorResponse(`No line with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
