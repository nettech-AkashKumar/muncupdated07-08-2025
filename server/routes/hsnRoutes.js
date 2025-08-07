
// routes/hsnRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    getPaginatedHSN,
    createHSN,
    updateHSN,
    deleteHSN,
    importHSN,
    exportHSN,
    bulkImportHSN,
    bulkImport
} = require('../controllers/hsnControllers');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/paginated', getPaginatedHSN);
router.post('/', createHSN);
router.put('/:id', updateHSN);
router.delete('/:id', deleteHSN);
// router.post('/import', upload.single('file'), importHSN);
router.post('/import-json', importHSN);
router.post('/import', bulkImport);
router.get('/export', exportHSN);

module.exports = router;
