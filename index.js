// modules required
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// to link the SQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "etracker_db"
});

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    startPrompt();
});

// For startPrompt 
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

// add Department 
const addDepartment = () => {
    console.log("ADD DEPARTMENT")
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

// add Role 
const addRole = () => {
    console.log("ADD ROLE")
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

// add Employee 
const addEmployee = () => {
    console.log("ADD EMPLOYEE")
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

// update Employee 
const updateEmployee = () => {
    console.log("UPDATE EMPLOYEE")
    const query = `SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id`;
    db.query(query, function(err, res) {
        if (err) throw err
        inquirer.prompt([{
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    let lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "What is the Employee's last name?",
            },
            {
                name: "role",
                type: "rawlist",
                message: "What is the Employees new title?",
                choices: selectRole()
            },
        ]).then(function(val) {
            let roleId = selectRole().indexOf(val.role) + 1;
            db.query("UPDATE employees SET ? WHERE ?", [{
                    last_name: val.lastName,

                }, {
                    role_id: roleId

                }],
                function(err) {
                    if (err) throw err
                    console.table(val)
                    startPrompt()
                })
        });
    });
};

// select Role FOR add/update employee prompt 
let roleArr = [];
const selectRole = () => {
    console.log("SELECT ROLE")
    const query = "SELECT * FROM roles";
    db.query(query, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};

// select Manager FOR add Employee prompt
let managersArr = [];
const selectManager = () => {
    console.log("SELECT MANAGER")
    const query = `SELECT first_name, last_name FROM employees WHERE manager_id IS NULL`;
    db.query(query, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
};




