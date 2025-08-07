const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

// Add
router.post("/cities", cityController.addCity);

// Get All
router.get("/cities", cityController.getAllCities);

// Get By State
router.get("/cities/state/:stateId", cityController.getCitiesByState);

// Update
router.put("/cities/:id", cityController.updateCity);

// Delete
router.delete("/cities/:id", cityController.deleteCity);

module.exports = router;
