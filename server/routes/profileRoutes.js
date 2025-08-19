const express = require("express");
const router = express.Router();
const {
  createUserProfile,
  getUserProfile,
  updateUserProfile
} = require("../controllers/profileController");

// Add middleware like verifyToken if needed
router.post("/", createUserProfile); // Create profile
router.get("/:userId", getUserProfile); // Get profile by userId
router.put("/:userId", updateUserProfile); // Update profile

module.exports = router;
