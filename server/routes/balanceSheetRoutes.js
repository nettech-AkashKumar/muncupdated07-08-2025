const express = require ("express");
const  BalanceSheet = require ("../models/balanceSheetSchema.js");

const balanceSheetRoutes = express.Router();

// Save new balance sheet
balanceSheetRoutes.post("/", async (req, res) => {
  try {
    const balanceSheet = new BalanceSheet(req.body);
    await balanceSheet.save();
    res.status(201).json(balanceSheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all balance sheets
balanceSheetRoutes.get("/", async (req, res) => {
  try {
    const data = await BalanceSheet.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports =  balanceSheetRoutes;
