const express = require('express');

const Line = require('../models/Line');

const { getLines, getLine, createLine, updateLine, deleteLine, getLinesForTable } = require('../controllers/lines')


const advancedResults = require('../middlewares/advancedResults');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });



router.route('/')
  .get(advancedResults(Line), getLines)
  .post(createLine);

router.route('/:id')
  .get(getLine)
  .put(updateLine)
  .delete(deleteLine);

 

module.exports = router;
