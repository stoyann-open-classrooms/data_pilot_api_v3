const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Table = require('../models/Table');
const Line = require('../models/Line');

// @desc      Create table
// @route     POST /api/v1/tables/create
// @access    Private/Admin
exports.createTable = asyncHandler(async (req, res, next) => {
 
  const table = await Table.create(req.body);

  res.status(201).json({
    success: true,
    data: table,
  });
});

// @desc      Get tables
// @route     GET /api/v1/tables
// @access    Private
exports.getTables = asyncHandler(async (req, res, next) => {
  const tables = await Table.find();

  res.status(200).json({
    success: true,
    data: tables,
  });
});


// @desc      Get table
// @route     GET /api/v1/tables/:id
// @access    Private
exports.getTable = asyncHandler(async (req, res, next) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    return next(
      new ErrorResponse(`Tableau not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: table,
  });
});



// @desc      Update table
// @route     PUT /api/v1/tables/:id
// @access    Private/Admin
exports.updateTable = asyncHandler(async (req, res, next) => {
    let table = await Table.findById(req.params.id);
  
    if (!table) {
      return next(
        new ErrorResponse(`Table not found with id of ${req.params.id}`, 404)
      );
    }
  
   
  
    table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      data: table,
    });
  });
  
// @desc      Delete table
// @route     DELETE /api/v1/tables/:id
// @access    Private/Admin
exports.deleteTableau = asyncHandler(async (req, res, next) => {
    const table = await Table.findById(req.params.id).populate("line");
  
    if (!table) {
      return next(
        new ErrorResponse(`Table not found with id of ${req.params.id}`, 404)
      );
    }



    // Then remove the tableau
    await table.deleteOne();
  
    res.status(200).json({
      success: true,
      data: {},
    });
});
