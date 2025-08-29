const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/GalleryController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", galleryController.getGalleries);
router.get("/:id", galleryController.getGalleryById);
router.post("/", authenticate, galleryController.createGallery);
router.put("/:id", authenticate, galleryController.updateGallery);
router.delete("/:id", authenticate, galleryController.deleteGallery);

module.exports = router;
