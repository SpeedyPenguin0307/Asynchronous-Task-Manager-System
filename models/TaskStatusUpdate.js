// models/TaskStatusUpdate.js
const db = require('../db/connection');

const TaskStatusUpdate = {
  addUpdate: async (AssignmentID, UpdateText) => {
    const [result] = await db.query(
      'INSERT INTO TaskStatusUpdates (AssignmentID, UpdateText) VALUES (?, ?)',
      [AssignmentID, UpdateText]
    );
    return result;
  },

  getAll: async () => {
    const [rows] = await db.query(`
      SELECT u.UpdateID, u.AssignmentID, ta.TaskID, t.Title, e.EmployeeName, u.UpdateText, u.UpdateTimestamp
      FROM TaskStatusUpdates u
      JOIN TaskAssignments ta ON u.AssignmentID = ta.AssignmentID
      JOIN Employee e ON ta.EmployeeID = e.EmployeeID
      JOIN Tasks t ON ta.TaskID = t.TaskID
      ORDER BY u.UpdateTimestamp DESC
    `);
    return rows;
  },

  findByTask: async (TaskID) => {
    const [rows] = await db.query(`
      SELECT u.*
      FROM TaskStatusUpdates u
      JOIN TaskAssignments ta ON u.AssignmentID = ta.AssignmentID
      WHERE ta.TaskID = ?
    `, [TaskID]);
    return rows;
  }
};

module.exports = TaskStatusUpdate;