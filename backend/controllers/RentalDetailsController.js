const RentalDetails = require("../models/RentalDetails");

exports.createRentalDetails = async (req, res) => {
  try {
    const rental = new RentalDetails({ ...req.body, user: req.user._id });
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getRentalDetails = async (req, res) => {
  try {
    const rentals = await RentalDetails.find()
      .populate("user", "name email")
      .populate("property");
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getRentalDetailsById = async (req, res) => {
  try {
    const rental = await RentalDetails.findById(req.params.id)
      .populate("user", "name email")
      .populate("property");
    if (!rental)
      return res.status(404).json({ message: "Rental details not found" });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateRentalDetails = async (req, res) => {
  try {
    const rental = await RentalDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!rental)
      return res.status(404).json({ message: "Rental details not found" });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteRentalDetails = async (req, res) => {
  try {
    const rental = await RentalDetails.findByIdAndDelete(req.params.id);
    if (!rental)
      return res.status(404).json({ message: "Rental details not found" });
    res.json({ message: "Rental details deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
