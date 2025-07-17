const express = require("express");
const router = express.Router();
const localityController = require("../controllers/LocalityController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", localityController.getLocalities);
router.get("/:id", localityController.getLocalityById);
router.post("/", authenticate, localityController.createLocality);
router.put("/:id", authenticate, localityController.updateLocality);
router.delete("/:id", authenticate, localityController.deleteLocality);

module.exports = router;
