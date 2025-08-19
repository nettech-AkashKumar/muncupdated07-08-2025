const mongoose = require("mongoose");

const rackLevelSchema = new mongoose.Schema({
    level: Number,
    barcode: String,
}, { _id: false });

const rackSchema = new mongoose.Schema({
    rackLabel: String,
    shelfLevels: Number,
    capacity: Number,
    levels: [rackLevelSchema],
}, { _id: false });

const warehouseSchema = new mongoose.Schema({
    warehouseName: { type: String, required: true },
    space: { type: String, required: true },
    items: { type: String, required: true },
    itemSize: { type: String, enum: ["small", "medium", "large"], default: "medium" },
    contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    phoneWork: String,
    streetAddress: String,
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
    postalCode: { type: String, required: true },
    //   status: { type: Boolean, default: true },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },

    capacityEstimate: { type: Number }, // Optional but useful
    racks: [rackSchema], //  Racks embedded here
}, { timestamps: true });

module.exports = mongoose.model("Warehouse", warehouseSchema);



// const mongoose = require("mongoose");

// const warehouseSchema = new mongoose.Schema({
//   warehouseName: { type: String, required: true },
//   space: { type: String, required: true },
//   items: { type: String, required: true },
//   contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   phoneWork: String,
//   streetAddress: String,
//   country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
//   state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
//   city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
//   postalCode: { type: String, required: true },
//   status: { type: Boolean, default: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Warehouse", warehouseSchema);
