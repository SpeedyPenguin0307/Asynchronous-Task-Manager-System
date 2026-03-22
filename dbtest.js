const db = require('./db/connection');

// Simple test query
db.query('SELECT * FROM Employees', (err, results) => {
  if (err) {
    console.error('Error fetching users:', err.message);
  } else {
    console.log('Fetched users:', results);
  }
  db.end(); // Always close the connection after work is done
});