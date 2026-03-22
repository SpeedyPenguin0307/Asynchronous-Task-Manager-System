// controllers/employeeController.js
const db = require('../db/connection');

// Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM Employee');
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Fetch assignable employees based on the logged-in user's role
const getAssignableEmployees = async (req, res) => {
  const { role } = req.query;

  try {
    let query = '';
    if (role === 'Upper Senior Manager') {
      query = "SELECT EmployeeID, EmployeeName FROM Employee WHERE Role != 'Upper Senior Manager'";
    } else if (role === 'Senior Manager') {
      query = "SELECT EmployeeID, EmployeeName FROM Employee WHERE Role IN ('Manager', 'Employee')";
    } else if (role === 'Manager') {
      query = "SELECT EmployeeID, EmployeeName FROM Employee WHERE Role = 'Employee'";
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching assignable employees:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllEmployees,
  getAssignableEmployees,
};