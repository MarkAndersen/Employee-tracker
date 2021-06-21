use employees_db;

INSERT INTO department (name)
VALUES ('Management');

INSERT INTO department (name)
VALUES ('Programmer');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', '100000', 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Developer', '50000', 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mark', 'Andersen', 2, 1);


SELECT first_name, last_name, title, salary
FROM employee
INNER JOIN role
WHERE employee.role_id=role.id;

SELECT title, salary, department
FROM role
INNER JOIN department
WHERE role.department_id = department.id;

DELETE FROM employee WHERE id =  ;
DELETE FROM role WHERE id =  ;
DELETE FROM department WHERE id =  ;

