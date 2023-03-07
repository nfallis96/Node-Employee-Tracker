// modules needed
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

// to link the SQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "etracker_db"
});

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    show_input();
});

