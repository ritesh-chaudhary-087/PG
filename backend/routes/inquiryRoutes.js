const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// User routes
router.post(
  "/:propertyId",
  authenticate,
  authorizeRoles("user"),
  inquiryController.sendInquiry
);
router.get(
  "/user",
  authenticate,
  authorizeRoles("user"),
  inquiryController.getUserInquiries
);

// Owner routes
router.get(
  "/owner",
  authenticate,
  authorizeRoles("owner"),
  inquiryController.getOwnerInquiries
);

// Common routes (both user and owner can delete their own inquiries)
router.delete("/:id", authenticate, inquiryController.deleteInquiry);

module.exports = router;
