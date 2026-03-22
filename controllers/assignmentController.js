const db = require('../db/connection');
const generateId = require('../utils/generateId');

const assignTask = async (req, res) => {
  try {
    const { TaskID, EmployeeID, AssignedBy } = req.body;

    // 1. Check if the Task exists
    const [taskRows] = await db.query('SELECT * FROM Tasks WHERE TaskID = ?', [TaskID]);
    if (taskRows.length === 0) {
      return res.status(400).json({ message: '❌ Invalid Task ID' });
    }

    // 2. Check if the Employee exists
    const [empRows] = await db.query('SELECT * FROM Employee WHERE EmployeeID = ?', [EmployeeID]);
    if (empRows.length === 0) {
      return res.status(400).json({ message: '❌ Invalid Employee ID' });
    }

    // 3. Check if this task is already assigned to the same employee
    const [existingAssignment] = await db.query(
      'SELECT * FROM TaskAssignments WHERE TaskID = ? AND EmployeeID = ?',
      [TaskID, EmployeeID]
    );

    if (existingAssignment.length > 0) {
      return res.status(409).json({ message: '⚠️ This task is already assigned to the selected employee' });
    }

    // 4. Generate Assignment ID and insert into TaskAssignments
    const AssignmentID = await generateId('TaskAssignments', 'AssignmentID', 'A');

    await db.query(
      'INSERT INTO TaskAssignments (AssignmentID, TaskID, EmployeeID) VALUES (?, ?, ?)',
      [AssignmentID, TaskID, EmployeeID]
    );

    res.status(201).json({ message: '✅ Task assigned successfully', AssignmentID });
  } catch (error) {
    console.error('❌ Assignment error:', error);
    res.status(500).json({ message: 'Server error while assigning task' });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const [assignments] = await db.query('SELECT * FROM TaskAssignments');
    res.json(assignments);
  } catch (err) {
    console.error('❌ Fetch assignments error:', err);
    res.status(500).json({ message: 'Server error while fetching assignments' });
  }
};

module.exports = {
  assignTask,
  getAllAssignments
};
