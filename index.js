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
    startPrompt();
});

// For startPrompt function 
const startPrompt = () => {
    return inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
    }]).then(function (val) {
        switch (val.action) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;


            case "Update Employee Role":
                updateEmployee();
        }
    });
}

// view all departments============================================
const viewAllDepartments = () => {
    const query = `SELECT * FROM departments`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};
