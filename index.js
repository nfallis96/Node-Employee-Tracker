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
    console.log("VIEWING ALL DEPARTMENTS")
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};

// viewAllRoles function
const viewAllRoles = () => {
    const query = `SELECT roles.id, roles.title, roles.salary FROM roles`;
    console.log("VIEWING ALL ROLES")
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};

// viewAllEmployees function
const viewAllEmployees = () => {
    console.log("VIEWING ALL EMPLOYEES")
    const query = `SELECT employees.id, employees.first_name, employees.last_name, departments.name, roles.title, roles.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id left join employees e on employees.manager_id = e.id;`;
    db.query(query,
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
};

// addDepartment function
const addDepartment = () => {
    inquirer.prompt([{
        name: "Name",
        type: "input",
        message: "What department would you like to add?"
    }]).then(function(res) {
        const query = "INSERT INTO departments VALUES ?";
        db.query(
            query, {
                name: res.Name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
};



