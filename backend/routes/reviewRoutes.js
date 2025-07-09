const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Add review (any authenticated user)
router.post("/", authenticate, reviewController.addReview);

// Get reviews (public, can filter by property)
router.get("/", reviewController.getReviews);

// Delete review (admin only)
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  reviewController.deleteReview
);

module.exports = router;
