const express = require("express");
const router = express.Router();
const amenitiesController = require("../controllers/AmenitiesController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", amenitiesController.getAmenities);
router.get("/:id", amenitiesController.getAmenitiesById);
router.post("/", authenticate, amenitiesController.createAmenities);
router.put("/:id", authenticate, amenitiesController.updateAmenities);
router.delete("/:id", authenticate, amenitiesController.deleteAmenities);

module.exports = router;
