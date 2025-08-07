// const User = require('../models/userModels');

// exports.registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     // Create new user
//     const user = new User({ name, email, password });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     console.error('Register Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };





































const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Otp = require('../models/otpModels');
const sendEmail = require('../utils/sendEmail');



// Register User
  exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      console.error('Get Users Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      console.error('Get User Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      console.error('Profile Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.updateUser = async (req, res) => {
    try {
      const { name, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true }
      ).select('-password');
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Update User Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete User Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
    

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  
      await Otp.deleteMany({ email }); // Remove existing OTPs for the same email
  
      const otp = new Otp({ email, otp: otpCode });
      await otp.save();
  
      await sendEmail(email, 'OTP for Password Reset', `Your OTP is: ${otpCode}`);
  
      res.status(200).json({ message: 'OTP sent to registered email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  exports.verifyOtpAndReset = async (req, res) => {
    const { email, otp, newPassword } = req.body;
  
    try {
      const validOtp = await Otp.findOne({ email, otp });
      if (!validOtp) return res.status(400).json({ message: 'Invalid or expired OTP' });
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.password = newPassword;
      await user.save();
  
      await Otp.deleteMany({ email }); // Clean up OTPs after use
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
    



// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const resetToken = crypto.randomBytes(20).toString('hex');
//     const expireTime = Date.now() + 30 * 60 * 1000; // 30 minutes

//     user.resetToken = resetToken;
//     user.resetTokenExpire = expireTime;
//     await user.save();

//     // For now, simulate sending reset link
//     const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
//     console.log(`Reset Link: ${resetLink}`);

//     res.status(200).json({ message: 'Reset link sent', resetLink });

//   } catch (err) {
//     console.error('Forgot Password Error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.resetPassword = async (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;
  
//     try {
//       const user = await User.findOne({
//         resetToken: token,
//         resetTokenExpire: { $gt: Date.now() }
//       });
  
//       if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
//       user.password = newPassword;
//       user.resetToken = undefined;
//       user.resetTokenExpire = undefined;
  
//       await user.save();
//       res.status(200).json({ message: 'Password reset successful' });
  
//     } catch (err) {
//       console.error('Reset Password Error:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
  

//   exports.changePassword = async (req, res) => {
//     const { currentPassword, newPassword } = req.body;
  
//     try {
//       const user = await User.findById(req.user.userId);
//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       const isMatch = await bcrypt.compare(currentPassword, user.password);
//       if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
  
//       user.password = newPassword;
//       await user.save();
  
//       res.status(200).json({ message: 'Password changed successfully' });
//     } catch (err) {
//       console.error('Change Password Error:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
  
