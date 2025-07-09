const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  contactEmail: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  city: { type: String },
  createdAt: { type: Date, default: Date.now },
});

InquirySchema.index({ property: 1 });
InquirySchema.index({ user: 1 });

module.exports = mongoose.model("Inquiry", InquirySchema);
