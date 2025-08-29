const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Public routes
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);

// Get total count of properties grouped by city
router.get("/count-by-city", propertyController.getPropertyCountByCity);

// Protected routes (owner only)
router.post(
  "/",
  authenticate,
  authorizeRoles("user", "owner"),
  propertyController.createProperty
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("user", "owner"),
  propertyController.updateProperty
);
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("user", "owner"),
  propertyController.deleteProperty
);

module.exports = router;
