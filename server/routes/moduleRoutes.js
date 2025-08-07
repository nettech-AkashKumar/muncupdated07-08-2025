const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

// Create and fetch modules
router.post("/add", moduleController.createModule);
router.get("/list", moduleController.getModules);

module.exports = router;
