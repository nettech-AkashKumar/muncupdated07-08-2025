const express = require("express");
const { createcustomers, getCustomers } = require("../controllers/AddCustomersControllers");

const router = express.Router();

router.get("/",getCustomers);
router.post("/",createcustomers);

module.exports =  router;