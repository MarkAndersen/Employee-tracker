use employees_db;

INSERT INTO department (name)
VALUES ('Management');

INSERT INTO department (name)
VALUES ('Programmer');

INSERT INTO department (name)
VALUES ('Logistics');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', '100000', 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Developer', '50000', 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Receiving Lead', '75000', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mark', 'Andersen', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gina', 'Smith', 1, 0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Johnson', 3, 1);


SELECT first_name, last_name, title, salary, name
FROM department
JOIN role
ON department_id = department.id
JOIN employee
ON role_id=role.id;


DELETE FROM employee WHERE id =  ;
DELETE FROM role WHERE id =  ;
DELETE FROM department WHERE id =  ;

