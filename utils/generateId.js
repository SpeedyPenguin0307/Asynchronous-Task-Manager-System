// utils/generateId.js
const db = require('../db/connection');

const generateId = async (table, column, prefix) => {
  const [rows] = await db.query(`
    SELECT ${column} 
    FROM ${table} 
    WHERE ${column} LIKE '${prefix}%' 
    ORDER BY 
      LENGTH(${column}) DESC, 
      ${column} DESC 
    LIMIT 1
  `);

  if (rows.length === 0) {
    return `${prefix}1`;
  }

  const lastId = rows[0][column]; // e.g., "T100", "A23"
  const numericPart = parseInt(lastId.replace(prefix, '')) || 0;
  const nextNumber = numericPart + 1;

  return `${prefix}${nextNumber}`;
};

module.exports = generateId;