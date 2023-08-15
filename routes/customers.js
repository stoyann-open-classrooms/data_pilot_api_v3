const express = require('express');
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomer,
} = require('../controllers/customers');

const Customers = require('../models/Customer');
const advancedResults = require('../middlewares/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

// Use the protect middleware if you want these routes to be protected
// router.use(protect);
// Only allow superAdmin to access these routes
// router.use(authorize('superAdmin'));

router.route('/')
  .get(advancedResults(Customers), getCustomers)
  .post(createCustomer);

router.route('/:id')
  .get( getCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
