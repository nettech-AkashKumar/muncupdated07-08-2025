// const mongoose = require('mongoose');

// const purchaseSchema = new mongoose.Schema({
//     supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
//     purchaseDate: Date,
//     referenceNumber: String,
//     products: [
//         {
//             product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//             quantity: Number,
//             unit: { type: String },
//             purchasePrice: Number,
//             discount: Number,
//             tax: Number,
//             taxAmount: { type: Number, default: 0 },   // Calculated tax amount
//             unitCost: Number, // ✅ NEW
//             totalCost: Number, // ✅ NEW
//         },
//     ],
//     orderTax: Number,
//     orderDiscount: Number,
//     shippingCost: Number,
//     grandTotal: Number,
//     status: String,
//     description: String,
//     image: [
//         {
//             url: String,
//             public_id: String,
//         },
//     ],

//     // ✅ Payment object as subdocument
//     // payment: {
//     //     paymentType: {
//     //         type: String,
//     //         enum: ['Full', 'Partial'],
//     //         required: true,
//     //     },
//     //     paymentStatus: {
//     //         type: String,
//     //         enum: ['Paid', 'Unpaid', 'Partial', 'Pending'],
//     //         default: 'Pending',
//     //     },
//     //     paidAmount: { type: Number, default: 0 },
//     //     dueAmount: { type: Number, default: 0 },
//     //     dueDate: { type: Date },

//     //     paymentMethod: {
//     //         type: String,
//     //         enum: ['Cash', 'Online', 'Cheque'],
//     //     },
//     //     transactionId: { type: String },
//     //     transactionDate: { type: Date },
//     //     onlineMethod: { type: String },
//     // },


//     createdAt: { type: Date, default: Date.now },
// },
//     { timestamps: true });

// module.exports = mongoose.model('Purchase', purchaseSchema);

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    purchaseDate: Date,
    referenceNumber: String,
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            unit: String,
            purchasePrice: Number,
             returnQty: Number, // ✅ Add this line
            discount: Number,
            tax: Number,
            taxAmount: { type: Number, default: 0 },
            unitCost: Number,
            totalCost: Number,
        },
    ],
    orderTax: Number,
    orderDiscount: Number,
    shippingCost: Number,
    grandTotal: Number,
    status: String,
    description: String,
    image: [
        {
            url: String,
            public_id: String,
        },
    ],

    // ✅ Make payment an array of objects
    payment: 
        {
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
            onlineMethod: String,
        },
        returns: [
  {
    referenceNumber: String,
    returnedProducts: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        returnQty: Number,
      }
    ],
    returnAmount: Number,
    returnDate: { type: Date, default: Date.now }
  }
],

         isDeleted: {
    type: Boolean,
    default: false,
  },
    

    createdAt: { type: Date, default: Date.now },
},
    { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
