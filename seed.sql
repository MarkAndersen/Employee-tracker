use employees_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mark', 'Andersen', 1, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Developer', '50000', 1);

INSERT INTO department (name)
VALUES ('Programmer');

ALTER TABLE employee AUTO_INCREMENT = 1;
ALTER TABLE role AUTO_INCREMENT = 1;
ALTER TABLE department AUTO_INCREMENT = 1;

DELETE FROM employee WHERE id =  ;
DELETE FROM role WHERE id =  ;
DELETE FROM department WHERE id =  ;