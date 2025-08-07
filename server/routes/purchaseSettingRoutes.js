// const express = require("express");
// const router = express.Router();
// const {
//     getSettings,
//     updateSettings,
// } = require("../controllers/purchaseSettingController");

// // GET Settings
// router.get("/get", getSettings);

// // PUT Update Settings
// router.put("/update", updateSettings);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/purchaseSettingController");

// Optional: add auth middleware to protect updateSettings route
// const { protect, admin } = require("../middleware/authMiddleware");

router.get("/get", getSettings);
router.put("/update", /* protect, admin, */ updateSettings);

module.exports = router;

