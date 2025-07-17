const mongoose = require("mongoose");

const AmenitiesSchema = new mongoose.Schema(
  {
    bathrooms: { type: Number, default: 0 },
    balcony: { type: Number, default: 0 },
    waterSupply: { type: String },
    petAllowed: { type: String },
    gym: { type: String },
    nonVegAllowed: { type: String },
    gatedSecurity: { type: String },
    showBy: { type: String },
    condition: { type: String },
    phone: { type: String },
    similarUnits: { type: String },
    amenities: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Amenities", AmenitiesSchema);
