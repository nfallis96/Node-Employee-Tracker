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
    console.log("ADD ALL DEPARTMENTS")
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

// addRole function
const addRole = () => {
    console.log("ADD ALL ROLES")
    const query = `SELECT roles.title, roles.salary FROM roles`;
    db.query(query, function(err, res) {
        inquirer.prompt([{
                name: "Title",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"
            }
        ]).then(function(res) {
            db.query(
                "INSERT INTO roles SET ?", {
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )
        });
    });
};

// addEmployee function
const addEmployee = () => {
    figlet("ADD  EMPLOYEE", function(err, res) {
        if (err) {
            console.log('Theres a mistake...');
            console.dir(err);
            return;
        }
        console.log(res)
    })
    inquirer.prompt([{
            name: "first_name",
            type: "input",
            message: "What is the employee's first name"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "list",
            message: "Who is this employee's manager?",
            choices: selectManager()
        }
    ]).then(function(val) {
        const roleId = selectRole().indexOf(val.role) + 1;
        const managerId = selectManager().indexOf(val.choice) + 1;
        db.query("INSERT INTO employees SET ?", {
            first_name: val.first_name,
            last_name: val.last_name,
            manager_id: managerId,
            role_id: roleId
        }, function(err) {
            if (err) throw err
            console.table(val)
            startPrompt()
        })
    })
};



