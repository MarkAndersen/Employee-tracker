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
    console.log(`connected as id ${connection.threadId}\n`);
    init();
  });

  const init = () => {
      inquirer
        .prompt ({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees, departments and roles',
                'Add employee',
                'Add department',
                'Add role',
                'Update employee',
            ],
        })
        .then((answer) => {
            console.log(answer.action);
            switch (answer.action) {
                case 'View all employees':
                    //employee console.table;
                    showEmployee();
                    break;

                case 'View all employees by department':
                    //employee where department console.table
                    showEmployeeDept();
                    break;

                case 'View all employees by role':
                    //employee where role = console.table
                    showEmployeeRole();
                    break;
                
                case 'Add employee':
                    addEmployee();
                    break;
                
                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;
                
                default:
                    console.log(`invalid action: ${answer.action}`);
                    break;
            }
            //switch case to guide the user to select an action
        });
  };
  const showEmployee = () => {
//let employee = []
//console.table [column Name, values]
  };
  const showEmployeeDept = () => {
//let employee = []
//console.table [column Name, values]    
  };
  const showEmployeeRole = () => {
//let employee = []
//console.table [column Name, values]
  };
  const addEmployee = () => {
//addEmployee(inquirer - input, INSERT INTO)
  };

  const addDepartment = () => {
//addDepartment(inquirer - input, INSERT INTO)
  };

  const addRole = () => {
//addRole(inquirer - input, INSERT INTO)
  };

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
