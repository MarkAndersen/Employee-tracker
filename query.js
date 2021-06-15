//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
console.table([
  {
    name: "foo",
    age: 10,
  },
  {
    name: "bar",
    age: 20,
  },
]);

//connection to the db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "6488",
  database: "employees_db",
});

//connection method and initialization call
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  init();
});

//switch case to guide the user to select an action
const init = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee",
        "Exit"
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          showEmployee();
          break;

        case "View all departments":
          showEmployeeDept();
          break;

        case "View all roles":
          showEmployeeRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`invalid action: ${answer.action}`);
          break;
      }
      
    });
};

//prompts user if they want to continue or quit.
const nextStep = () => {
  inquirer
    .prompt({
      name: "action",
      type: "confirm",
      message: "Would you like to edit more?",
    })
    .then((answer) => {
      if (answer.action === true) {
        init();
      } else {
        connection.end();
      }
    });
};

//Methods to view database
const showEmployee = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    nextStep();
  });
};
const showEmployeeDept = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    nextStep();
  });
};
const showEmployeeRole = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    nextStep();
  });
};

//methods to add employees, departments, roles, etc.
//addEmployee(inquirer - input, INSERT INTO)
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "First Name",
      },
      {
        name: "last",
        type: "input",
        message: "Last Name",
      },
      {
        name: "manager",
        type: "input",
        message: "Manager ID",
      },
      {
        name: "role",
        type: "input",
        message: "Role ID",
      },
    ])
    .then((answer) => {
      console.log(answer);
      nextStep();
    });

};

const addDepartment = () => {
  //addDepartment(inquirer - input, INSERT INTO)
  inquirer
  .prompt(
    {
      name: "dept",
      type: "input",
      message: "Department Name",
    }
  )
  .then((answer) => {
    console.log(answer);
    nextStep();
  });

};

const addRole = () => {
  //addRole(inquirer - input, INSERT INTO)
  inquirer
  .prompt([
    {
      name: "role",
      type: "input",
      message: "Role",
    },
    {
      name: "salary",
      type: "input",
      message: "Salary",
    },
    {
      name: "dept",
      type: "input",
      message: "Department ID",
    }
  ])
  .then((answer) => {
    console.log(answer);
    nextStep();
  });
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
//    SET has_pet = true, pet_name = 'Franklin', pet_age = 2
//    WHERE name = 'Peter';

//    ONCE THIS TODO IS DONE, LOOK INTO BONUS MATERIAL
