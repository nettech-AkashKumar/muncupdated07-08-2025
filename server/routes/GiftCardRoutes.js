const express = require("express");
const { getGiftCard, createGiftCard, updateGiftCard, deletedGiftCard } = require("../controllers/GiftCardControllers");

const router = express.Router();

router.get("/",getGiftCard);
router.post("/",createGiftCard);
router.put("/:id",updateGiftCard);
router.delete("/:id",deletedGiftCard);

module.exports = router;