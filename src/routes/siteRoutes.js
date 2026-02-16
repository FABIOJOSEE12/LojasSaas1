const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, siteController.createSiteRequest);
router.get('/', protect, siteController.getMySites);
router.get('/:id', protect, siteController.getSiteDetails);

router.put('/:id', protect, siteController.updateSiteContent);

// Admin routes
router.get('/admin/all', protect, admin, siteController.getAllSitesAdmin);
router.put('/:id/status', protect, admin, siteController.updateSiteStatus);
router.delete('/:id', protect, siteController.deleteSite);

module.exports = router;
