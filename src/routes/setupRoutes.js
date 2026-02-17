const express = require('express');
const router = express.Router();
const setupController = require('../controllers/setupController');

router.get('/config-inicial', setupController.runSetup);

module.exports = router;
