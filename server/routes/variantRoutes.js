const express = require("express");
const {  getVariant, createVariant, updateVariant, deleteVariant } = require("../controllers/varientController");


const router = express.Router();

router.get("/",getVariant);
router.post("/",createVariant);
router.put("/:id",updateVariant);
router.delete("/:id",deleteVariant);

module.exports = router;