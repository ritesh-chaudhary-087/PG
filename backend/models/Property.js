const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    apartmentType: { type: String, required: true },
    apartmentName: { type: String, required: true },
    bhkType: { type: String, required: true },
    noOfFloors: { type: String, required: true },
    propertyAge: { type: String, required: true },
    facing: { type: String, required: true },
    buildUpArea: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
