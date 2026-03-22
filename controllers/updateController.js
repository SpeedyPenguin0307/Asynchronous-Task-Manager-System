const db = require('../db/connection');
const generateId = require('../utils/generateId');

const addStatusUpdate = async (req, res) => {
  try {
    const { AssignmentID, UpdateText } = req.body;
    const UpdateID = await generateId('TaskStatusUpdates', 'UpdateID', 'U');

    await db.query(
      'INSERT INTO TaskStatusUpdates (UpdateID, AssignmentID, UpdateText) VALUES (?, ?, ?)',
      [UpdateID, AssignmentID, UpdateText]
    );

    res.status(201).json({ message: 'Status update added successfully', updateId: UpdateID });
  } catch (error) {
    console.error('Error adding update:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllUpdates = async (req, res) => {
  try {
    const [updates] = await db.query('SELECT * FROM TaskStatusUpdates');
    res.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addStatusUpdate,
  getAllUpdates,
};