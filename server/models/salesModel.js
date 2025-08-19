const mongoose = require('mongoose');

// 🔹 Nested Payment Schema
const paymentSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ['Full', 'Partial'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid', 'Partial', 'Pending'],
    default: 'Pending',
  },
  paidAmount: { type: Number, default: 0 },
  dueAmount: { type: Number, default: 0 },
  dueDate: { type: Date },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Online', 'Cheque'],
  },
  transactionId: String,
  transactionDate: Date,
  onlineMethod: {
    type: String,
    enum: ['UPI', 'NEFT', 'RTGS', 'IMPS', 'Net Banking', 'Credit Card', 'Debit Card', 'Wallet'],
  },
}, { _id: false });

const aditionalSchema = new mongoose.Schema({
  orderTax: { type: Number, default: 0 },
  orderDiscount: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },

}, { _id: false });
const taxSchema = new mongoose.Schema({
  cgst: { type: String, default: '' },
  sgst: { type: String, default: '' },
  discount: { type: String, default: '' },
  roundOff: { type: Boolean, default: false },

}, { _id: false });

// 🔹 Sales Schema
const salesSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  billing: { type: Object },
  shipping: { type: Object },

  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    sellingPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
  }],

  saleDate: { type: Date, default: Date.now },


  status: {
    type: String,
    enum: [
      'New', 'Contacted', 'Qualified', 'Proposal Sent',
      'Negotiation', 'In Progress', 'On Hold',
      'Won', 'Lost'
    ],
    default: 'New'
  },

  payments: [paymentSchema], // 🔹 multiple payments support
  aditionalCharges: [aditionalSchema], // 🔹 multiple payments support
  tax: [taxSchema], // 🔹 multiple payments support

  images: [{ type: String }], // store image URLs or file paths
  description: String,
  referenceNumber: String,

  extraInfo: {
    notes: String,
  },

 

  enableTax: { type: Boolean, default: false },
  enableAddCharges: { type: Boolean, default: false },
  currency: { type: String, default: 'INR' },
});

module.exports = mongoose.model('Sales', salesSchema);
