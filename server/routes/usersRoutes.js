const express = require("express");
const router = express.Router();
const upload = require("../middleware/Multer/multer");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getActiveUsers,
  userData,
} = require("../controllers/usersController");

// Create user (with image upload)
router.post("/add", upload.array("profileImage"), createUser);

// Get all users
router.get("/getuser", getAllUsers);

// Get a specific user
router.get("/user/:id", getUserById);

// Update user (with optional image upload)
router.put("/update/:id", upload.single("profileImage"), updateUser);

// Delete user
router.delete("/userDelete/:id", deleteUser);
router.get("/status/active", getActiveUsers);

// userData 
router.get('/userdata/:id', userData);

module.exports = router;



