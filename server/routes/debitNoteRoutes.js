const express = require('express');
const router = express.Router();
const controller = require('../controllers/debitNoteController');

router.get('/next-id', controller.getNextDebitNoteId);
router.post('/', controller.createDebitNote);
router.post('/return', controller.createProductReturn);
// router.get('/', controller.getAllDebitNotes);
router.get('/getDebit', controller.getAllDebit);

router.get('/:id', controller.getDebitNoteById);
router.put('/:id', controller.updateDebitNote);
router.delete('/:id', controller.deleteDebitNote);

module.exports = router;
