const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkout', protect, paymentController.createCheckoutSession);
router.post('/webhook', paymentController.handleWebhook); // Webhooks usually don't have user auth middleware, they verify signature

module.exports = router;
