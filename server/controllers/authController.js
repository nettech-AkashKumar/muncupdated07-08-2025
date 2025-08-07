const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/usersModels");
const Otp = require("../models/otpModels");
const sendEmail = require("../utils/sendEmail");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  
  try {
    const user = await User.findOne({ email }).populate("role");

    if (!user) return res.status(404).json({ message: "User not found" });

    // 🚫 Prevent inactive users from logging in

    if (user.status === "Inactive") {
      return res.status(403).json({ message: "Your account is inactive. Please contact admin." });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const roleData = user.role
      ? {
          roleName: user.role.roleName,
          modulePermissions: Object.fromEntries(user.role.modulePermissions || []),
        }
      : null;

    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: roleData,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        status: user.status,
        role: roleData,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// LOGOUT
exports.logoutUser = async (req, res) => {
  try {
    // For JWT, you usually handle logout on client side
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    const otp = new Otp({ email, otp: otpCode });
    await otp.save();

    await sendEmail(email, "OTP for Password Reset", `Your OTP is: ${otpCode}`);

    res.status(200).json({ message: "OTP sent to registered email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// VERIFY OTP & RESET PASSWORD
exports.verifyOtpAndReset = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) return res.status(400).json({ message: "Invalid or expired OTP" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await Otp.deleteMany({ email });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
