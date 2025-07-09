const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.put('/users/:id/block', adminController.blockUser);

router.get('/properties', adminController.getAllPropertiesAdmin);
router.delete('/properties/:id', adminController.deletePropertyAdmin);

module.exports = router;
