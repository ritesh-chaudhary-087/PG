const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    city: { type: String },
    type: { type: String, enum: ["1BHK", "2BHK", "3BHK"] },
    category: {
      type: String,
      enum: ["hostel", "pg", "flat", "shared_room", "desk", "cabin", "office"],
    },
    location: {
      address: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    landmark: { type: String },
    locality: { type: String },
    propertyFacing: {
      type: String,
      enum: [
        "North",
        "South",
        "East",
        "West",
        "North-East",
        "North-West",
        "South-East",
        "South-West",
      ],
    },
    propertyFloor: { type: Number },
    rent: Number,
    deposit: {
      amount: { type: Number, default: 0 },
      isRefundable: { type: Boolean, default: true },
      description: String,
    },
    maxOccupancy: Number,
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalFloor: { type: Number, default: 1 },
    buildingAge: { type: Number, default: 0 },
    parkingArea: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    monthlyMaintenance: { type: Number, default: 0 },
    preferredTenants: {
      type: String,
      enum: ["anyone", "family", "bachelor_male", "bachelor_female", "company"],
      default: "anyone",
    },
    furnished: { type: Boolean, default: false },
    phone: { type: String },
    amenities: [
      {
        type: String,
        enum: ["gym", "wifi", "swimming_pool", "garden", "club_house", "other"],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
