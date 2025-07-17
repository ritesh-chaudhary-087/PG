const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    availability: { type: String },
    startTime: { type: String },
    startPeriod: { type: String, enum: ["AM", "PM"] },
    endTime: { type: String },
    endPeriod: { type: String, enum: ["AM", "PM"] },
    availableAllDay: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
