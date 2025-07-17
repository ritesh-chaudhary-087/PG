const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/ScheduleController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", scheduleController.getSchedules);
router.get("/:id", scheduleController.getScheduleById);
router.post("/", authenticate, scheduleController.createSchedule);
router.put("/:id", authenticate, scheduleController.updateSchedule);
router.delete("/:id", authenticate, scheduleController.deleteSchedule);

module.exports = router;
