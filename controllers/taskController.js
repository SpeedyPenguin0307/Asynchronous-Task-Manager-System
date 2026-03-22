const db = require('../db/connection');
const generateId = require('../utils/generateId');

const createTask = async (req, res) => {
  try {
    const TaskID = await generateId('Tasks', 'TaskID', 'T');
    const { Title, Description, Status, DueDate, Priority, CreatedBy } = req.body;

    await db.query(
      'INSERT INTO Tasks (TaskID, Title, Description, Status, DueDate, Priority, CreatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [TaskID, Title, Description, Status, DueDate, Priority, CreatedBy]
    );

    res.status(201).json({ message: 'Task created successfully', taskId: TaskID });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM Tasks');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTasksAssignedTo = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const [tasks] = await db.query(
      `SELECT t.* 
       FROM Tasks t
       JOIN TaskAssignments ta ON t.TaskID = ta.TaskID
       WHERE ta.EmployeeID = ?`,
      [employeeId]
    );
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching assigned tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTasksCreatedBy = async (req, res) => {
  const { creatorId } = req.params;
  try {
    const [tasks] = await db.query(
      `SELECT * FROM Tasks WHERE CreatedBy = ?`,
      [creatorId]
    );
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching created tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Description, Status, DueDate, Priority } = req.body;

    await db.query(
      'UPDATE Tasks SET Title = ?, Description = ?, Status = ?, DueDate = ?, Priority = ? WHERE TaskID = ?',
      [Title, Description, Status, DueDate, Priority, id]
    );

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getTasksAssignedTo,
  getTasksCreatedBy,
  updateTask,
};