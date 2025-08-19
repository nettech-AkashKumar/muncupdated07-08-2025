const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


// Get all active customers
router.get('/active', customerController.getActiveCustomers);

router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
