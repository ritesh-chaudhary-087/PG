const mongoose = require("mongoose");

const LocalitySchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    locality: { type: String, required: true },
    landmark: { type: String, required: true },
    mapSearch: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Locality", LocalitySchema);
