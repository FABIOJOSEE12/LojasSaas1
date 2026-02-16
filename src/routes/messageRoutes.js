const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, messageController.createMessage);
router.get('/', protect, messageController.getMyMessages);

// Admin routes
router.get('/admin/all', protect, admin, messageController.getAllMessagesAdmin);
router.put('/:id/status', protect, admin, messageController.updateMessageStatus);

module.exports = router;
