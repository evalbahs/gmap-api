const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location.controller');

router.get('/location', locationController.getLocation);

module.exports = router;