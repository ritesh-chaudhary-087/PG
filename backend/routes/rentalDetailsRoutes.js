const express = require("express");
const router = express.Router();
const rentalDetailsController = require("../controllers/RentalDetailsController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", rentalDetailsController.getRentalDetails);
router.get("/:id", rentalDetailsController.getRentalDetailsById);
router.post("/", authenticate, rentalDetailsController.createRentalDetails);
router.put("/:id", authenticate, rentalDetailsController.updateRentalDetails);
router.delete(
  "/:id",
  authenticate,
  rentalDetailsController.deleteRentalDetails
);

module.exports = router;
