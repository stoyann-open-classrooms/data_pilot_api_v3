const express = require('express');
const Rapport = require('../models/Rapport');
const {
  getRapports,
  getRapport,
  createRapport,
  updateRapport,
  deleteRapport,
} = require('../controllers/rapports');

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(advancedResults(Rapport), getRapports)
  .post(protect, authorize('superAdmin'), createRapport);

router.route('/:id')
  .get(protect, getRapport)
  .put(protect, authorize('superAdmin'), updateRapport)
  .delete(protect, authorize('superAdmin'), deleteRapport);

module.exports = router;
