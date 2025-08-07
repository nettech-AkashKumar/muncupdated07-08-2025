const express = require('express');
const router = express.Router();
const stockHistoryController = require('../controllers/stockHistoryController');

router.get('/', stockHistoryController.getStockHistory);

// Update a stock log
router.put('/:id', stockHistoryController.updateStockHistory);

// Delete a stock log
router.delete('/:id', stockHistoryController.deleteStockHistory);

module.exports = router;
