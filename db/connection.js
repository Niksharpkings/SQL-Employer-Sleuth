const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  
  
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
  password: '$!NSAmySQL92',
  database: 'employee_sleuth',
  port: 3306,
});

  module.exports = db;