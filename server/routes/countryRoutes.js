const express = require("express");
const router = express.Router();
const {
  addCountry,
  getAllCountries,
  updateCountry,
  deleteCountry,
  bulkImportCountries
} = require("../controllers/countryController");

// POST - Create
router.post("/", addCountry);

// GET - Read All
router.get("/", getAllCountries);

// PUT - Update
router.put("/:id", updateCountry);

// DELETE - Delete
router.delete("/:id", deleteCountry);

router.post('/import', bulkImportCountries);

module.exports = router;
