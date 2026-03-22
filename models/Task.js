// models/Task.js
const db = require('../db/connection');

const Task = {
  create: async ({ Title, Description, Status = 'Pending', DueDate, Priority = 'Medium', CreatedBy }) => {
    const [result] = await db.query(
      'INSERT INTO Tasks (Title, Description, Status, DueDate, Priority, CreatedBy) VALUES (?, ?, ?, ?, ?, ?)',
      [Title, Description, Status, DueDate, Priority, CreatedBy]
    );
    return result;
  },

  findAll: async (filters = {}) => {
    const { status, priority } = filters;
    let query = 'SELECT * FROM Tasks WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND Status = ?';
      params.push(status);
    }
    if (priority) {
      query += ' AND Priority = ?';
      params.push(priority);
    }

    const [rows] = await db.query(query, params);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM Tasks WHERE TaskID = ?', [id]);
    return rows[0];
  },

  update: async (id, data) => {
    const { Title, Description, Status, DueDate, Priority } = data;
    const [result] = await db.query(
      'UPDATE Tasks SET Title = ?, Description = ?, Status = ?, DueDate = ?, Priority = ? WHERE TaskID = ?',
      [Title, Description, Status, DueDate, Priority, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM Tasks WHERE TaskID = ?', [id]);
    return result;
  },
};

module.exports = Task;