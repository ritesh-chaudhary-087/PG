const Amenities = require("../models/Amenities");

exports.createAmenities = async (req, res) => {
  try {
    const amenities = new Amenities({ ...req.body, user: req.user._id });
    await amenities.save();
    res.status(201).json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.find()
      .populate("user", "name email")
      .populate("property");
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAmenitiesById = async (req, res) => {
  try {
    const amenities = await Amenities.findById(req.params.id)
      .populate("user", "name email")
      .populate("property");
    if (!amenities)
      return res.status(404).json({ message: "Amenities not found" });
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!amenities)
      return res.status(404).json({ message: "Amenities not found" });
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.findByIdAndDelete(req.params.id);
    if (!amenities)
      return res.status(404).json({ message: "Amenities not found" });
    res.json({ message: "Amenities deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
