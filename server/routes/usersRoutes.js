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
  searchUsersByEmail,
    toggleTwoFactor,
  toggleAccountStatus
} = require("../controllers/usersController");

// Create user (with image upload)
router.post("/add", upload.array("profileImage"), createUser);

// Get all users
router.get("/getuser", getAllUsers);

// Search users by email
router.get("/search", searchUsersByEmail);

// Get a specific user
router.get("/:id", getUserById);

// Update user (with optional image upload)
router.put("/update/:id", upload.single("profileImage"), updateUser);

// Delete user
router.delete("/userDelete/:id", deleteUser);
router.get("/status/active", getActiveUsers);

// userData 
router.get('/userdata/:id', userData);

// two factor
router.put("/toggle-2fa/:id", toggleTwoFactor);
// for activate and deactivate account
router.put("/toggle-status/:id", toggleAccountStatus);

module.exports = router;



