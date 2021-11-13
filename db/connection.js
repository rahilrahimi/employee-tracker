//import mysql
const mysql = require('mysql2');
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        // Your MySQL username,
        user: process.env.DB_USER,
        // Your MySQL password
        password: process.env.DB_PW,
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
);


//export
module.exports = db;