const DebitNote = require('../models/debitNoteModel');
const Purchase = require('../models/purchaseModels');
const Product = require('../models/productModels');
const StockHistory = require('../models/stockHistoryModels');




// Helper to generate next debitNoteId
async function getNextDebitNoteId() {
  const last = await DebitNote.findOne().sort({ createdAt: -1 });
  if (!last || !last.debitNoteId) return 'DN0001';
  const num = parseInt(last.debitNoteId.replace('DN', ''));
  const nextNum = isNaN(num) ? 1 : num + 1;
  return 'DN' + nextNum.toString().padStart(4, '0');
}

// exports.createDebitNote = async (req, res) => {
//   try {
//     // Auto-generate debitNoteId
//     if (!req.body.debitNoteId) {
//       req.body.debitNoteId = await getNextDebitNoteId();
//     }

//     // Clean ObjectId fields
//     const cleanBody = { ...req.body };
//     ['billFrom', 'billTo', 'purchase'].forEach(field => {
//       if (cleanBody[field] === '') delete cleanBody[field];
//     });

//     // Format products into debit note products
//     if (Array.isArray(cleanBody.products)) {
//       cleanBody.items = cleanBody.products.map(p => ({
//         productService: p.productName || '',
//         quantity: p.quantity,
//         unit: p.unitName || p.unit || '',
//         rate: p.purchasePrice,
//         discount: p.discount,
//         tax: p.tax,
//         amount: (p.quantity * p.purchasePrice) - (p.discount || 0) +
//           (((p.quantity * p.purchasePrice - (p.discount || 0)) * (p.tax || 0)) / 100)
//       }));
//       delete cleanBody.products;
//     }

//     const debitNote = new DebitNote(cleanBody);
//     await debitNote.save();

//     // Return handling logic: subtract stock & update history
//     if (Array.isArray(req.body.products) && cleanBody.purchase) {
//       const purchase = await Purchase.findById(cleanBody.purchase);
//       if (!purchase) {
//         return res.status(404).json({ message: 'Referenced purchase not found' });
//       }

//       const reference = purchase.referenceNumber;

//       for (const item of req.body.products) {
//         const { productId, quantity, purchasePrice } = item;

//         if (!productId || !quantity) continue;

//         // 1. Subtract from product stock
//         await Product.findByIdAndUpdate(productId, {
//           $inc: { quantity: -Math.abs(quantity) }
//         });

//         // 2. Update purchase product quantity
//         const purchaseItem = purchase.products.find(p => p.product.toString() === productId);
//         if (purchaseItem) {
//           purchaseItem.quantity = Math.max(0, purchaseItem.quantity - Math.abs(quantity));
//         }

//         // 3. Create stock history entry for return
//         await StockHistory.create({
//           product: productId,
//           date: new Date(),
//           quantityChanged: -Math.abs(quantity),
//           priceChanged: purchasePrice || 0,
//           type: 'debit-note',
//           notes: `Debit Note for ref: ${reference}`,
//         });
//       }

//       await purchase.save();
//     }

//     res.status(201).json({ success: true, data: debitNote });
//   } catch (err) {
//     console.error('Debit Note Error:', err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


// exports.createDebitNote = async (req, res) => {
//   try {
//     // Auto-generate debitNoteId if not provided
//     if (!req.body.debitNoteId) {
//       req.body.debitNoteId = await getNextDebitNoteId();
//     }


//     // Remove empty string values for ObjectId fields to avoid cast errors
//     const cleanBody = { ...req.body };
//     ['billFrom', 'billTo', 'purchase'].forEach(field => {
//       if (cleanBody[field] === '') delete cleanBody[field];
//     });

//     // If products array is present, map it to items for the DebitNote model
//     if (Array.isArray(cleanBody.products)) {
//       cleanBody.items = cleanBody.products.map(p => ({
//         productService: p.productName || '',
//         quantity: p.quantity,
//         unit: p.unitName || p.unit || '',
//         rate: p.purchasePrice,
//         discount: p.discount,
//         tax: p.tax,
//         amount: (p.quantity * p.purchasePrice) - (p.discount || 0) + (((p.quantity * p.purchasePrice - (p.discount || 0)) * (p.tax || 0)) / 100)
//       }));
//       delete cleanBody.products;
//     }

//     const debitNote = new DebitNote(cleanBody);
//     await debitNote.save();


//     // Subtract returned quantities from Product stock, update purchase's product quantities, and update StockHistory
//     if (Array.isArray(req.body.products) && cleanBody.purchase) {
//       const purchase = await Purchase.findById(cleanBody.purchase);
//       if (purchase) {


//         const StockHistory = require('../models/stockHistoryModels');
//         for (const item of req.body.products) {
//           const { productId, quantity } = item;
//           if (productId && quantity) {
//             // Subtract from product stock
//             await Product.findByIdAndUpdate(productId, { $inc: { quantity: -Math.abs(quantity) } });
//             // Subtract from purchase's product quantity
//             const purchaseProduct = purchase.products.find(p => p.product.toString() === productId);
//             if (purchaseProduct) {
//               purchaseProduct.quantity = Math.max(0, purchaseProduct.quantity - Math.abs(quantity));
//             }
//             // Subtract from StockHistory (by product and referenceNumber)
//             if (purchase.referenceNumber) {
//               const stockHistory = await StockHistory.findOne({
//                 product: productId,
//                 notes: { $regex: purchase.referenceNumber, $options: 'i' }
//               });
//               if (stockHistory) {
//                 stockHistory.quantityChanged = stockHistory.quantityChanged - Math.abs(quantity);
//                 await stockHistory.save();
//               }
//             }
//           }
//         }
//         await purchase.save();
//       }
//     }

//     res.status(201).json(debitNote);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Helper to generate next debitNoteId
// async function getNextDebitNoteId() {
//   const last = await DebitNote.findOne().sort({ createdAt: -1 });
//   if (!last || !last.debitNoteId) return 'DN0001';
//   const num = parseInt(last.debitNoteId.replace('DN', ''));
//   const nextNum = isNaN(num) ? 1 : num + 1;
//   return 'DN' + nextNum.toString().padStart(4, '0');
// }

// const Product = require('../models/productModels');
// 



// MID FINNAL WORKINGH
// exports.createDebitNote = async (req, res) => {
//   try {
//     // 1. Auto-generate debitNoteId if not provided
//     if (!req.body.debitNoteId) {
//       req.body.debitNoteId = await getNextDebitNoteId();
//     }

//     // 2. Clean empty string objectId fields
//     const cleanBody = { ...req.body };
//     ['billFrom', 'billTo', 'purchase'].forEach(field => {
//       if (cleanBody[field] === '') delete cleanBody[field];
//     });

//     // 3. Map `products` to `items` for DebitNote model, use returnQty for all updates
//     if (Array.isArray(cleanBody.products)) {
//       cleanBody.items = cleanBody.products.map(p => {
//         const returnQty = Number(p.returnQty) || 0;
//         const price = Number(p.purchasePrice) || 0;
//         const discount = Number(p.discount) || 0;
//         const tax = Number(p.tax) || 0;

//         const baseAmount = returnQty * price - discount;
//         const taxAmount = (baseAmount * tax) / 100;
//         const total = baseAmount + taxAmount;

//         return {
//           product: p.productId,
//           quantity: returnQty,
//           unit: p.unit || '',
//           purchasePrice: price,
//           discount,
//           tax,
//           taxAmount,
//           unitCost: price,
//           totalCost: total,
//           quantityReturned: returnQty,
//         };
//       });
//       // Do not delete cleanBody.products here, needed for inventory update below
//     }

//     // 4. Create DebitNote document
//     const debitNote = new DebitNote({
//       debitNoteId: cleanBody.debitNoteId,
//       referenceNumber: cleanBody.referenceNumber,
//       debitNoteDate: cleanBody.debitNoteDate || new Date(),
//       dueDate: cleanBody.dueDate,
//       status: cleanBody.status || 'Pending',
//       currency: cleanBody.currency || 'USD',
//       enableTax: cleanBody.enableTax || false,
//       billFrom: cleanBody.billFrom,
//       billTo: cleanBody.billTo,
//       products: cleanBody.products,
//       extraInfo: cleanBody.extraInfo || {},
//       amount: cleanBody.amount || 0,
//       cgst: cleanBody.cgst || 0,
//       sgst: cleanBody.sgst || 0,
//       discount: cleanBody.discount || '0',
//       roundOff: cleanBody.roundOff || false,
//       total: cleanBody.total || 0,
//       totalInWords: cleanBody.totalInWords || '',
//       signature: cleanBody.signature || '',
//       signatureName: cleanBody.signatureName || '',
//       signatureImage: cleanBody.signatureImage || '',
//       purchase: cleanBody.purchase || null,
//     });

//     await debitNote.save();

//     // 5. Update stock, purchase, and stock history for each returned product
//     if (Array.isArray(cleanBody.products) && cleanBody.purchase) {
//       const purchase = await Purchase.findById(cleanBody.purchase);
//       if (purchase) {
//         for (const item of cleanBody.products) {
//           const { productId, returnQty = 0, purchasePrice } = item;
//           const qty = parseFloat(returnQty) || 0;
//           if (!productId || qty <= 0) continue;

//           // Subtract from product stock
//           await Product.findByIdAndUpdate(productId, { $inc: { quantity: -qty } });

//           // Subtract from purchase's product quantity
//           const purchaseProduct = purchase.products.find(p => p.product.toString() === productId.toString());
//           if (purchaseProduct) {
//             purchaseProduct.quantity = Math.max(0, purchaseProduct.quantity - qty);
//           }

//           // Push to StockHistory with type 'return' and quantityReturned
//           await StockHistory.create({
//             product: productId,
//             date: new Date(),
//             quantityChanged: -qty,
//             quantityReturned: qty,
//             priceChanged: purchasePrice,
//             type: 'return',
//             notes: `Debit note created for Purchase Ref: ${purchase.referenceNumber}`,
//           });
//         }
//         await purchase.save();
//       }
//     }

//     return res.status(201).json({
//       message: 'Debit Note created successfully',
//       data: debitNote,
//     });

//   } catch (error) {
//     console.error('Error creating debit note:', error);
//     return res.status(500).json({
//       message: 'Failed to create debit note',
//       error: error.message,
//     });
//   }
// };


// FINAL
// exports.createDebitNote = async (req, res) => {
//   try {
//     // Auto-generate debitNoteId if not provided
//     if (!req.body.debitNoteId) {
//       req.body.debitNoteId = await getNextDebitNoteId();
//     }


//     // Remove empty string values for ObjectId fields to avoid cast errors
//     const cleanBody = { ...req.body };
//     ['billFrom', 'billTo', 'purchase'].forEach(field => {
//       if (cleanBody[field] === '') delete cleanBody[field];
//     });

//     // If products array is present, map it to items for the DebitNote model
//     if (Array.isArray(cleanBody.products)) {
//       cleanBody.items = cleanBody.products.map(p => ({


//         productService: p.productName || '',
//         quantity: p.quantity,
//         unit: p.unitName || p.unit || '',
//         rate: p.purchasePrice,
//         discount: p.discount,
//         tax: p.tax,
//         amount: (p.quantity * p.purchasePrice) - (p.discount || 0) + (((p.quantity * p.purchasePrice - (p.discount || 0)) * (p.tax || 0)) / 100)

//       }));
//       delete cleanBody.products;
//     }

//     const debitNote = new DebitNote(cleanBody);
//     await debitNote.save();


//     // Subtract returned quantities from Product stock, update purchase's product quantities, and update StockHistory
//     if (Array.isArray(req.body.products) && cleanBody.purchase) {
//       const purchase = await Purchase.findById(cleanBody.purchase);
//       if (purchase) {
//         for (const item of req.body.products) {
//           const { productId, quantity } = item;
//           if (productId && quantity) {
//             // Subtract from product stock
//             await Product.findByIdAndUpdate(productId, { $inc: { quantity: -Math.abs(quantity) } });
//             // Subtract from purchase's product quantity
//             const purchaseProduct = purchase.products.find(p => p.product.toString() === productId);
//             if (purchaseProduct) {
//               purchaseProduct.quantity = Math.max(0, purchaseProduct.quantity - Math.abs(quantity));
//             }
//             // Subtract from StockHistory (by product and referenceNumber)
//             if (purchase.referenceNumber) {
//               const stockHistory = await StockHistory.findOne({
//                 product: productId,
//                 notes: { $regex: purchase.referenceNumber, $options: 'i' }
//               });
//               if (stockHistory) {
//                 stockHistory.quantityChanged = stockHistory.quantityChanged - Math.abs(quantity);
//                 await stockHistory.save();
//               }
//             }
//           }
//         }
//         await purchase.save();
//       }
//     }

//     res.status(201).json(debitNote);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.createDebitNote = async (req, res) => {
  try {
    // 1. Auto-generate debitNoteId if not provided
    if (!req.body.debitNoteId) {
      req.body.debitNoteId = await getNextDebitNoteId();
    }

    // 2. Clean empty string ObjectId fields
    const cleanBody = { ...req.body };
    ['billFrom', 'billTo', 'purchase'].forEach(field => {
      if (cleanBody[field] === '') delete cleanBody[field];
    });

    // 3. Prepare items array from products array
    if (Array.isArray(cleanBody.products)) {
      cleanBody.items = cleanBody.products.map(p => {
        const returnQty = Number(p.returnQty) || 0;
        const price = Number(p.purchasePrice) || 0;
        const discount = Number(p.discount) || 0;
        const tax = Number(p.tax) || 0;

        const baseAmount = returnQty * price - discount;
        const taxAmount = (baseAmount * tax) / 100;
        const total = baseAmount + taxAmount;

        return {
          product: p.productId,
          quantity: returnQty,
          unit: p.unit || '',
          purchasePrice: price,
          discount,
          tax,
          taxAmount,
          unitCost: price,
          totalCost: total,
          quantityReturned: returnQty,
        };
      });
    }

    // 4. Create DebitNote document
    const debitNote = new DebitNote({
      debitNoteId: cleanBody.debitNoteId,
      referenceNumber: cleanBody.referenceNumber,
      debitNoteDate: cleanBody.debitNoteDate || new Date(),
      dueDate: cleanBody.dueDate,
      status: cleanBody.status || 'Pending',
      currency: cleanBody.currency || 'USD',
      enableTax: cleanBody.enableTax || false,
      billFrom: cleanBody.billFrom,
      billTo: cleanBody.billTo,
      products: cleanBody.products,
      extraInfo: cleanBody.extraInfo || {},
      amount: cleanBody.amount || 0,
      cgst: cleanBody.cgst || 0,
      sgst: cleanBody.sgst || 0,
      discount: cleanBody.discount || '0',
      roundOff: cleanBody.roundOff || false,
      total: cleanBody.total || 0,
      totalInWords: cleanBody.totalInWords || '',
      signature: cleanBody.signature || '',
      signatureName: cleanBody.signatureName || '',
      signatureImage: cleanBody.signatureImage || '',
      purchase: cleanBody.purchase || null,
      items: cleanBody.items,
    });

    await debitNote.save();

    // 5. Update product stock, purchase quantity, and stock history
    if (Array.isArray(cleanBody.products) && cleanBody.purchase) {
      const relatedPurchase = await Purchase.findById(cleanBody.purchase);
      if (relatedPurchase) {
        for (const item of cleanBody.products) {
          const { productId, returnQty = 0, purchasePrice } = item;
          const qty = parseFloat(returnQty);
          if (!productId || qty <= 0) continue;

          // ✅ 1. Update product stock (reduce)
          await Product.findByIdAndUpdate(productId, {
            $inc: { quantity: -qty },
          });

          // ✅ 2. Update quantity in the purchase object
          const purchaseProduct = relatedPurchase.products.find(p => p.product.toString() === productId.toString());
          if (purchaseProduct) {
            purchaseProduct.quantity = Math.max(0, purchaseProduct.quantity - qty);
          }

          // ✅ 3. Log stock return in history
          await StockHistory.create({
            product: productId,
            date: new Date(),
            quantityChanged: -qty,
            quantityReturned: qty,
            priceChanged: purchasePrice,
            type: 'return',
            notes: `Debit Note for purchase ref: ${relatedPurchase.referenceNumber}`,
          });
        }

        await relatedPurchase.save();
      }
    }

    // 6. Return success response
    return res.status(201).json({
      message: 'Debit Note created successfully',
      data: debitNote,
    });

  } catch (error) {
    console.error('Error creating debit note:', error);
    return res.status(500).json({
      message: 'Failed to create debit note',
      error: error.message,
    });
  }
};

exports.getAllDebitNotes = async (req, res) => {
  try {
    const notes = await DebitNote.find().populate('purchase').populate('billFrom').populate('billTo');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDebitNoteById = async (req, res) => {
  try {
    const note = await DebitNote.findById(req.params.id).populate('purchase').populate('billFrom').populate('billTo');
    if (!note) return res.status(404).json({ error: 'Not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDebitNote = async (req, res) => {
  try {
    const note = await DebitNote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDebitNote = async (req, res) => {
  try {
    await DebitNote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNextDebitNoteId = async (req, res) => {
  try {
    const nextId = await getNextDebitNoteId();
    res.json({ nextId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
