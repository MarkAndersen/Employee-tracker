DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT(11) AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
),
-- role is showing as blue as it used to be reserved 
-- but have become unreserved... may cause issues
CREATE TABLE role (
    id INT(11),
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT(11),
    PRIMARY KEY (id)
),

CREATE TABLE employee (
    id INT(11),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(11),
    manager_id INT (11),
    PRIMARY KEY (id)
),
