const mongoose = require("mongoose");

const RentalDetailsSchema = new mongoose.Schema(
  {
    propertyFor: { type: String, enum: ["Rent", "Lease"], required: true },
    expectedRent: { type: Number, required: true },
    rentNegotiable: { type: Boolean, default: false },
    expectedDeposit: { type: Number, required: true },
    monthlyMaintenance: { type: Number, default: 0 },
    availableFrom: { type: Date, required: true },
    preferredTenants: [{ type: String }],
    furnishing: { type: String },
    parking: { type: String },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RentalDetails", RentalDetailsSchema);
