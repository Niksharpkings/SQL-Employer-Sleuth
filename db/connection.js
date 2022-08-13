const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$!NSAmySQL92',
  database: 'employee_sleuth',
  port: 3306
});

  module.exports = db;