const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/', assignmentController.assignTask);
router.get('/', assignmentController.getAllAssignments); // optional

module.exports = router;
