const express = require('express')
const { getTables, createTable, getTable, updateTable, deleteTableau } = require('../controllers/tables')
const { getLinesForTable } = require('../controllers/lines');
const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const advancedResults = require('../middlewares/advancedResults')
const Table = require('../models/Table');
const path = require('path');

// router.use(protect)
// router.use(authorize('admin', 'staff'))

router
  .route('/')
  .get(advancedResults(Table), getTables)
  .post(createTable);

router.route('/:id').get(getTable).put(updateTable).delete(deleteTableau)

// bouger ca de la ! 
router.route('/:tableauId/lines').get(getLinesForTable);

module.exports = router
