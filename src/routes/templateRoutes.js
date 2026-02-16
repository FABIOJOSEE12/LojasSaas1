const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to view templates
router.get('/', templateController.listTemplates);
router.get('/:id', templateController.getTemplate);

// Admin route to create templates
router.post('/', protect, admin, templateController.createTemplate);

module.exports = router;
