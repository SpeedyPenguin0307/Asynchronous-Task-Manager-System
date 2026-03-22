// controllers/employeeController.js
const db = require('../db/connection');

const getAllEmployees = async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM Employee');
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllEmployees };