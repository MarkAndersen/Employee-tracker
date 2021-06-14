//dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
//connection to the db
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '6488',
    database: 'employees_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected to the db!')
  });

  //TODO:
  //INIT();

  //Inquirer Prompt function
  //Store the answers

  //Template literals for INSERT INTO
  //Joining tables to output

  //at the very least, needs to:
  //  * Add departments, roles, employees
  //  - INSERT INTO * FROM. etc....

  //  * View departments, roles, employees
  //  -THIS IS WHERE CONSOLE.TABLE COMES INTO PLAY

  //  * Update employee roles:
  //  - EXMPLE BELOW... MAY HAVE A SWITCH CASE OR LOOP
  //  - UPDATE table
  //    SET has_pet = true, pet_name = "Franklin", pet_age = 2
  //    WHERE name = "Peter";

  //    ONCE THIS TODO IS DONE, LOOK INTO BONUS MATERIAL
