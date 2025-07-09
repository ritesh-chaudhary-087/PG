const Review = require("../models/Review");
const Property = require("../models/Property");

// Add a review (only for registered users)
exports.addReview = async (req, res) => {
  try {
    const { property, review, star } = req.body;
    if (!property || !review || !star)
      return res.status(400).json({ message: "All fields required" });

    // Optionally, check if property exists
    const prop = await Property.findById(property);
    if (!prop) return res.status(404).json({ message: "Property not found" });

    const newReview = new Review({
      user: req.user._id,
      name: req.user.name,
      property,
      review,
      star,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get reviews (optionally by property)
exports.getReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.property) filter.property = req.query.property;
    const reviews = await Review.find(filter).populate("user", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete review (admin only)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
