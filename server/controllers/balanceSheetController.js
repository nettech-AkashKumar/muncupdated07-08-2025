const BalanceSheet = require("../models/balanceSheetSchema");

const saveBalanceSheet = async (req, res) => {
  try {
    const balanceSheet = new BalanceSheet(req.body);
    await balanceSheet.save();
    res.status(201).json({ success: true, data: balanceSheet });
  } catch (error) {
    console.error("Save failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
