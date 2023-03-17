-- Department seeds
INSERT INTO departments (id, name)
VALUES (1, "Board"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Finance"),
       (5, "Legal");

-- Role seeds
INSERT INTO roles (department_id, title, salary)
VALUES (1, "CEO", 1000000),
       (2, "Sales Lead", 100000),
       (2, "Salesperson", 80000),
       (3, "Lead Engineer", 150000),
       (3, "Software Engineer", 120000),
       (4, "Accountant Manager", 160000),
       (4, "Accountant", 125000),
       (5, "Legal Team Lead", 250000),
       (5, "Lawyer", 190000);

-- Employee seeds
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Nicole", "Fallis", 1, null),
       ("William", "Mich", 2, 1),
       ("Cory", "Devon", 3, 3),
       ("Juan", "Kassis", 4, 1),
       ("Michael", "Gonzalez", 5, 4), 
       ("Melinda", "Torrez", 6, 1),
       ("Cristina", "Lainez", 7, 5),
       ("Fernando", "Lopez", 8, 1),
       ("Mustafa", "Ahmed", 9, 6);