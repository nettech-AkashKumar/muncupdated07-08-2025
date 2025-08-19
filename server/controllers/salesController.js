const Sales = require('../models/salesModel');
const mongoose = require('mongoose');

// Create Sale
exports.createSale = async (req, res) => {
  try {
    let data = req.body;
    // If using FormData, parse nested fields
    if (data.extraInfo && typeof data.extraInfo === 'string') {
      data.extraInfo = JSON.parse(data.extraInfo);
    }
    // Handle images/signatureImage if using multer
    // Save sale
    const sale = new Sales(data);
    await sale.save();

    // Decrement product quantity for each sold product
    if (Array.isArray(data.products)) {
      const Product = require('../models/productModels');
      for (const item of data.products) {
        const product = await Product.findById(item.productId);
        if (product) {
          // Calculate new availableQty (quantity + sum(newQuantity) - saleQyt)
          let qty = Number(product.quantity) || 0;
          let newQuantitySum = 0;
          if (Array.isArray(product.newQuantity)) {
            newQuantitySum = product.newQuantity.reduce((acc, n) => {
              const num = Number(n);
              return acc + (isNaN(num) ? 0 : num);
            }, 0);
          } else if (typeof product.newQuantity === 'number') {
            newQuantitySum = Number(product.newQuantity);
          }
          const availableQty = qty + newQuantitySum;
          const saleQyt = Number(item.quantity) || 0;
          let updatedQty = availableQty - saleQyt;
          if (updatedQty < 0) updatedQty = 0;
          // Save only the main quantity field (newQuantity untouched)
          await Product.findByIdAndUpdate(item.productId, { quantity: updatedQty });
        }
      }
    }
    res.status(201).json({ success: true, sale });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update sale
exports.updateSale = async (req, res) => {
  try {
    let data = req.body;
    if (data.extraInfo && typeof data.extraInfo === 'string') {
      data.extraInfo = JSON.parse(data.extraInfo);
    }
    const sale = await Sales.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete sale
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
