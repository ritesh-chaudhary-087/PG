const Inquiry = require("../models/Inquiry");
const Property = require("../models/Property");

exports.sendInquiry = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    if (!req.body.city) {
      return res.status(400).json({ message: "City is required" });
    }

    const inquiry = new Inquiry({
      property: property._id,
      user: req.user._id,
      message: req.body.message,
      contactEmail: req.body.contactEmail || req.user.email,
      city: req.body.city,
    });
    await inquiry.save();

    res.status(201).json(inquiry);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOwnerInquiries = async (req, res) => {
  try {
    // Find inquiries on owner's properties
    const properties = await Property.find({ owner: req.user._id }).select(
      "_id"
    );
    const propertyIds = properties.map((p) => p._id);

    const inquiries = await Inquiry.find({ property: { $in: propertyIds } })
      .populate("user", "name email")
      .populate("property", "title");

    res.json(inquiries);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ user: req.user._id }).populate(
      "property",
      "title location price"
    );

    res.json(inquiries);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

    // Only inquiry owner or admin can delete
    if (
      inquiry.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await inquiry.remove();
    res.json({ message: "Inquiry deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
