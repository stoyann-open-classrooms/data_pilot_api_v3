const express = require('express');
const {
  getAuthorizations,
  createAuthorization,
  getAuthorization,
  updateAuthorization,
  deleteAuthorization,
} = require('../controllers/permissions');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middlewares/auth');
const advancedResults = require('../middlewares/advancedResults');
const Authorization = require('../models/Permission');


// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(Authorization), getAuthorizations)
  .post(createAuthorization);

router
  .route('/:id')
  .get(getAuthorization)
  .put(updateAuthorization)
  .delete(deleteAuthorization);

module.exports = router;
