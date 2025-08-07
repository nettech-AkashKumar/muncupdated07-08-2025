const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/create', roleController.createRole);
router.get('/getRole', roleController.getAllRoles);
router.get('/roleById/:id', roleController.getRoleById); // ✅ Fixed
router.put('/update/:id', roleController.updateRole);
router.delete('/delete/:id', roleController.deleteRole);
router.get('/getRole/active', roleController.getActiveRoles);
router.post('/assign-permissions', roleController.assignPermissions);

module.exports = router;
