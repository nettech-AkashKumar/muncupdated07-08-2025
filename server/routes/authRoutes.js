const express = require("express");
const router = express.Router();
const {
  loginUser,
  logoutUser,
  forgotPassword,
  verifyOtpAndReset,
  verifyotp,
  logDevice
} = require("../controllers/authController"); // Or move these to a separate `authController`

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", logoutUser);

// Forgot password (send OTP)
router.post("/forgot-password", forgotPassword);

// Verify OTP and reset password
router.post("/verify-otp-reset", verifyOtpAndReset);

router.post("/verify-otp", verifyotp);

router.post("/log-device", logDevice);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const {
//   loginUser,
//   logoutUser,
//   forgotPassword,
//   verifyOtpAndReset,
// } = require("../controllers/authController"); // Or move these to a separate `authController`

// // Login
// router.post("/login", loginUser);

// // Logout
// router.post("/logout", logoutUser);

// // Forgot password (send OTP)
// router.post("/forgot-password", forgotPassword);

// // Verify OTP and reset password
// router.post("/verify-otp-reset", verifyOtpAndReset);

// module.exports = router;
