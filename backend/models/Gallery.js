const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    photos: [{ type: String }],
    videos: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);
