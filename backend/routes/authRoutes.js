const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  authenticate,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Public routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Protected routes
router.post("/logout", authenticate, authController.logoutUser);
router.get("/profile", authenticate, authController.getUserProfile);
router.put("/profile", authenticate, authController.updateUserProfile);
router.post("/change-password", authenticate, authController.changePassword);

module.exports = router;
