const express = require("express");
const { getWarranty, createWarranty, updateWarranty, deleteWarranty } = require("../controllers/warrantyControllers");


const router = express.Router();

router.get("/",getWarranty);
router.post("/",createWarranty);
router.put("/:id",updateWarranty);
router.delete("/:id",deleteWarranty);

module.exports = router;