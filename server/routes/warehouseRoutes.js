const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/warehouseControllers");

// === Export routes ===
router.get("/:id/racks/export/csv", ctrl.exportRackLayoutCSV);
router.get("/:id/racks/export/pdf", ctrl.exportRackLayoutPDF);

// === Custom and static routes first ===

router.get("/active", ctrl.getActiveWarehouses);     // <- /api/warehouse/active
/* custom BEFORE :id */
router.patch("/:id/merge-racks", ctrl.mergeRacks);
router.put("/:id/update-rack", ctrl.updateRack);


// === CRUD ===
router.post("/", ctrl.createWarehouse);
router.get("/", ctrl.getAllWarehouses);
router.get("/:id", ctrl.getWarehouseById);
router.put("/:id", ctrl.updateWarehouse);
router.delete("/:id", ctrl.deleteWarehouse);

module.exports = router;





// const express = require("express");
// const router = express.Router();
// const ctrl = require("../controllers/warehouseControllers");

// router.post("/", ctrl.createWarehouse);
// router.get("/", ctrl.getAllWarehouses);
// router.put("/:id", ctrl.updateWarehouse);
// router.delete("/:id", ctrl.deleteWarehouse);
// router.get("/:id", ctrl.getWarehouseById);
// router.get("/warehouse/active", ctrl.getActiveWarehouses);

// router.get("/:id/racks/export/csv", ctrl.exportRackLayoutCSV);
// router.get("/:id/racks/export/pdf", ctrl.exportRackLayoutPDF);

// module.exports = router;
