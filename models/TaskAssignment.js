// models/TaskAssignment.js
const db = require('../db/connection');

const TaskAssignment = {
  assign: async (TaskID, EmployeeID) => {
    const [result] = await db.query(
      'INSERT INTO TaskAssignments (TaskID, EmployeeID) VALUES (?, ?)',
      [TaskID, EmployeeID]
    );
    return result;
  },

  findAll: async () => {
    const [rows] = await db.query(`
      SELECT ta.AssignmentID, ta.TaskID, t.Title, ta.EmployeeID, e.EmployeeName, ta.AssignedAt
      FROM TaskAssignments ta
      JOIN Employee e ON ta.EmployeeID = e.EmployeeID
      JOIN Tasks t ON ta.TaskID = t.TaskID
    `);
    return rows;
  },

  findByEmployee: async (EmployeeID) => {
    const [rows] = await db.query(
      'SELECT * FROM TaskAssignments WHERE EmployeeID = ?',
      [EmployeeID]
    );
    return rows;
  },
};

module.exports = TaskAssignment;