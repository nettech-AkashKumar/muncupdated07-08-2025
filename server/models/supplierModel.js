const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  supplierCode: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  businessType: { type: String, required: true },
  gstin: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  status: { type: Boolean, default: true },
  bank: {
    bankName: String,
    branch: String,
    accountHolder: String,
    accountNumber: String,
    ifsc: String,
  },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Supplier', SupplierSchema);
