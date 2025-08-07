// routes/unitRoutes.js
const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitsController");

router.post("/units", unitController.createUnit);
router.get("/units", unitController.getUnits);
router.get("/units/:id", unitController.getUnitById);
router.put("/units/:id", unitController.updateUnit);
router.delete("/units/:id", unitController.deleteUnit);
// router.get("/units/active", unitController.getActiveUnits); 

router.get("/units/status/active", unitController.getActiveUnits);

// 🔽 Get only active units (latest first)
// router.get("/units/active", unitController.getActiveUnits);


module.exports = router;