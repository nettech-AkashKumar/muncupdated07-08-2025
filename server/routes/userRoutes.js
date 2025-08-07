// const express = require('express');
// const router = express.Router();
// const { registerUser } = require('../controllers/userController');

// // @route   POST /api/users/register
// router.post('/register', registerUser);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   forgotPassword,
//   resetPassword,
//   changePassword,
//   verifyOtpAndReset,
//   getAllUsers,
//   getUserProfile,
//   getUserById,
//   updateUser,
//   deleteUser
// } = require('../controllers/userController');
// const authMiddleware = require('../middleware/auth');

// // Existing
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // New
// // router.post('/forgot-password', forgotPassword);
// // router.post('/reset-password/:token', resetPassword);
// // router.post('/change-password', authMiddleware, changePassword);
// router.post('/forgot-password', forgotPassword);
// router.post('/verify-otp-reset', verifyOtpAndReset);

// // New routes
// router.get('/', getAllUsers);
// router.get('/profile', authMiddleware, getUserProfile);
// router.get('/:id', getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);


// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/userController');

// // Register
// router.post('/register', registerUser);

// // Login
// router.post('/login', loginUser);

//module.exports = router;
