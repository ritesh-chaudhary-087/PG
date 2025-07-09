const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    if (!propertyData.city) {
      return res.status(400).json({ message: "City is required" });
    }
    propertyData.owner = req.user._id;

    const property = new Property(propertyData);
    await property.save();

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    // Support query filters
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.city) filters["location.city"] = req.query.city;

    const properties = await Property.find(filters).populate(
      "owner",
      "name email"
    );
    res.json(properties);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Owner or Admin can update
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(property, req.body);
    await property.save();

    res.json(property);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // Owner or Admin can delete
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await property.remove();
    res.json({ message: "Property deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Get total count of properties grouped by city
exports.getPropertyCountByCity = async (req, res) => {
  try {
    const counts = await Property.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          count: 1,
        },
      },
    ]);
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
