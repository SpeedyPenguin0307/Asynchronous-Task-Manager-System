const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');

router.post('/', updateController.addStatusUpdate);
router.get('/', updateController.getAllUpdates);

module.exports = router;