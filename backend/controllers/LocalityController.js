const Locality = require("../models/Locality");

exports.createLocality = async (req, res) => {
  try {
    const locality = new Locality({ ...req.body, user: req.user._id });
    await locality.save();
    res.status(201).json(locality);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getLocalities = async (req, res) => {
  try {
    const localities = await Locality.find()
      .populate("user", "name email")
      .populate("property");
    res.json(localities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getLocalityById = async (req, res) => {
  try {
    const locality = await Locality.findById(req.params.id)
      .populate("user", "name email")
      .populate("property");
    if (!locality)
      return res.status(404).json({ message: "Locality not found" });
    res.json(locality);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateLocality = async (req, res) => {
  try {
    const locality = await Locality.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!locality)
      return res.status(404).json({ message: "Locality not found" });
    res.json(locality);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteLocality = async (req, res) => {
  try {
    const locality = await Locality.findByIdAndDelete(req.params.id);
    if (!locality)
      return res.status(404).json({ message: "Locality not found" });
    res.json({ message: "Locality deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
