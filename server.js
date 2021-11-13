//import express
const express = require('express');
//import db from connections.js
const db = require('./db/connection');

//set up port
const PORT = process.env.PORT || 3001;
//set express() to a variable app
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

  
//add READ route for department table
// Get all departments
app.get('/', (req, res) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//start express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});