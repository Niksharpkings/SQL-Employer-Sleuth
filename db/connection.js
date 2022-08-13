const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ADD YOUR SQL PASSWORD HERE ',
  database: 'employee_sleuth',
  port: 3306
});

  module.exports = db;