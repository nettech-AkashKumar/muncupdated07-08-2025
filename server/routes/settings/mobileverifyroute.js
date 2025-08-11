const express = require("express")
const {sendOtp, verifyOtp} = require("../../controllers/settings/MobileVerificationController.js")
const mobileverifyrouter = express.Router();

mobileverifyrouter.post("/send-otp", sendOtp)
mobileverifyrouter.post("/verify-otp", verifyOtp)


module.exports = mobileverifyrouter;