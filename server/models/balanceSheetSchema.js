const  mongoose = require ("mongoose")

const balanceSheetSchema = new mongoose.Schema({
  assets: {
    bankBalance: Number,
    accountReceivable: Number,
    cashInHand: Number,
    prepaidExpenses: Number,
    property: Number,
    officeEquipment: Number,
    software: Number,
    deposit: Number,
  },
  liabilities: {
    accountpayable: Number,
    outstanding: Number,
    shorttermLoan: Number,
    longtermLoan: Number,
    lease: Number,
  },
  equities: {
    capital: Number,
    retainedEarnings: Number,
    withdrawl: Number,
  },
  totals: {
    totalAssets: Number,
    totalLiabilities: Number,
    totalEquities: Number,
  }
}, { timestamps: true });

const BalanceSheet = mongoose.model("BalanceSheet", balanceSheetSchema);

module.exports =  BalanceSheet;