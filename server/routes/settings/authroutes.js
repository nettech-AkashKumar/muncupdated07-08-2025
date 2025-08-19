const express = require("express");
const { verifyGoogleToken } = require("../../controllers/settings/authcontroller.js");
const authrouter = express.Router();
authrouter.post("/google", verifyGoogleToken);

module.exports = authrouter;
