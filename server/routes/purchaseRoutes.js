const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const upload = require("../middleware/Multer/multer"); // Fixed double slash

// 🔹 Purchase Routes
router.post("/create", upload.array('images'), purchaseController.createPurchase);
router.get("/reference/next", purchaseController.getNextReferenceNumber);
router.get("/", purchaseController.getAllPurchases);
router.put("/:id", upload.array('images'), purchaseController.updatePurchase);
router.put("/:id/return", purchaseController.updatePurchaseOnReturn); // 🔥 This is new
router.delete("/:id", purchaseController.deletePurchase);


// 🔹 Purchase Return Routes
// router.post("/return", purchaseController.createProductReturn); // create a new return
// router.get('/debit-notes',purchaseController.getAllDebitNotes);
router.put("/:id/return", purchaseController.updatePurchase); // update purchase for return (PUT for update)
router.get("/return/all", purchaseController.getAllReturns);     // list of all returns

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const purchaseController = require("../controllers/purchaseController");
// const upload = require("../middleware//Multer/multer");


// router.post("/create", upload.array('images'), purchaseController.createPurchase);
// router.get("/reference/next", purchaseController.getNextReferenceNumber);


// router.get("/", purchaseController.getAllPurchases);

// router.put('/:id', upload.array('images'), purchaseController.updatePurchase); // ✅ handles multipart/form-data

// router.delete("/:id", purchaseController.deletePurchase);

// module.exports = router;

