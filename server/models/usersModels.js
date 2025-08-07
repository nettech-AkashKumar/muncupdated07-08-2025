const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    resetToken: String,
    resetTokenExpire: Date,
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", usersSchema);
