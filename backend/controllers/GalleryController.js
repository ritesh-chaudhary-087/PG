const Gallery = require("../models/Gallery");

exports.createGallery = async (req, res) => {
  try {
    const gallery = new Gallery({ ...req.body, user: req.user._id });
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find()
      .populate("user", "name email")
      .populate("property");
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
      .populate("user", "name email")
      .populate("property");
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });
    res.json({ message: "Gallery deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
