const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/assigned/:employeeId', taskController.getTasksAssignedTo);
router.get('/created/:creatorId', taskController.getTasksCreatedBy);
router.put('/:id', taskController.updateTask);
module.exports = router;
