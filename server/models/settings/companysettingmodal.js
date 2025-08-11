const mongoose = require("mongoose");
const companysettingSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyemail: { type: String, required: true },
  companyphone: { type: String, required: true },
  companyfax: { type: String, required: true },
  companywebsite: { type: String, required: true },
  companyaddress: { type: String, required: true },
  companycountry: { type: String, required: true },
  companystate: { type: String, required: true },
  companycity: { type: String, required: true },
  companypostalcode: { type: Number, required: true },
  companyIcon: { type: String },
  companyFavicon: { type: String },
  companyLogo: { type: String },
  companyDarkLogo:{type:String}

}, {
    timestamps:true,
});

const companysettingModal = mongoose.model("companysetting", companysettingSchema);
module.exports = companysettingModal;
