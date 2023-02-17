// required material
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// links for sql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employeeTracker_db"
});

db.connect(function(err) {
    if (err) throw err
    console.log("MySQL Connected")
    startPrompt();
});