//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
var selectedEmployee = "";
console.table([
  {
    name: "initialize",
    why: "documentation said so",
  },
  {
    name: "initialize-2-electric boogaloo",
    why: "documentation said so",
  },
]);

//connection to the db
//**remember to change password for your local host DB**
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
        "Exit",
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

        case "Update employee":
          updateEmployee();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`invalid action: ${answer.action}`);
          nextStep();
          break;
      }
    });
};

//prompts user if they want to continue or quit.
//called at end of every interaction.
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

//Methods to view database for all employees, departments, and roles
const showEmployee = () => {
  connection.query(
    "SELECT first_name, last_name, title, salary, name FROM department JOIN role ON department_id = department.id JOIN employee ON role_id=role.id ",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      nextStep();
    }
  );
};
const showEmployeeDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    nextStep();
  });
};
const showEmployeeRole = () => {
  connection.query("SELECT title, salary FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    nextStep();
  });
};

//methods to add employees, departments, roles, had to create array work arounds to
//give user options to chose from, had a hard time passing selection into promise callback
//so re-queried database to match indices to ids
const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
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
          name: "manager_id",
          type: "input",
          message: "Manager ID?",
        },
  //giving user choice in which role to assign employee to.
        {
          name: "role_id",
          type: "rawlist",
          choices() {
            const choiceArray = [];
            res.forEach(({ title }) => {
              choiceArray.push(title);
            });
            return choiceArray;
          },
          message: "What role?",
        },
      ])
      .then((answer) => {
  //nested queries, parent query is to match our choice index to selected role to pass through into insert method
        connection.query("SELECT title FROM role", (err, res) => {
          if (err) throw err;
          const titleArray = [];
          res.forEach(({ title }) => {
            titleArray.push(title);
          });
          const chosen = titleArray.indexOf(answer.role_id);
          connection.query(
            `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('${
              answer.first
            }', '${answer.last}', '${answer.manager_id}', '${chosen + 1}')`,
            (err) => {
              if (err) throw err;
            }
          );
        });
      })
      .then(() => {
        nextStep();
      });
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "Department Name",
    })
    .then((answer) => {
      connection.query(
        `INSERT INTO department (name) VALUES ('${answer.dept}')`,
        (err) => {
          if (err) throw err;
        }
      );
    })
    .then(() => {
      nextStep();
    });
};

const addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Title?",
        },
        {
          name: "salary",
          type: "input",
          message: "Salary?",
        },
//giving user choice of department to assign role to
        {
          name: "dept_id",
          type: "rawlist",
          choices() {
            const secondChoiceArray = [];
            res.forEach(({ name }) => {
              secondChoiceArray.push(name);
            });
            return secondChoiceArray;
          },
          message: "Which department?",
        },
      ])
      .then((answer) => {
//once again had to nest queries to match indices in order to push up selection to DB INSERT
        connection.query("SELECT name FROM department", (err, res) => {
          if (err) throw err;
          const nameArray = [];
          res.forEach(({ name }) => {
            nameArray.push(name);
          });
          const chosenDept = nameArray.indexOf(answer.dept_id);
          connection.query(
            `INSERT INTO role (title, salary, department_id) VALUES ('${
              answer.title
            }', '${answer.salary}', '${chosenDept + 1}')`,
            (err) => {
              if (err) throw err;
            }
          );
        });
      })
      .then(() => {
        nextStep();
      });
  });
};

//updating employee table
const updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employee",
          type: "rawlist",
//this mess is a way to present the user with the concatenated strings to present a full name
          choices() {
            const firstArray = [];
            const lastArray = [];
            let choiceArray = [];
            res.forEach(({ first_name, last_name }) => {
              firstArray.push(first_name);
              lastArray.push(last_name);
              choiceArray = firstArray.map((value, index) => {
                return value + " " + lastArray[index];
              });
            });
            return choiceArray;
          },
          message: "Which employee are you updating?",
        },
        {
          name: "update",
          type: "list",
          messages: "What would you like to update?",
          choices: ["Role", "Restart", "Exit"],
        },
      ])
      .then((answer) => {
//passing in our employee name string into the switch case options and methods
        selectedEmployee = answer.employee;
        switch (answer.update) {
          case "Role":
            updateRole(selectedEmployee);
            break;

          case "Restart":
            nextStep();
            break;

          case "Exit":
            connection.end();
            break;

          default:
            console.log(`invalid action: ${answer.action}`);
            nextStep();
            break;
        }
      });
  });
};

//updating method(s)

const updateRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt({
        name: "new_role",
        type: "rawlist",
//same role selection as addEmployee method
        choices() {
          const choiceArray = [];
          res.forEach(({ title }) => {
            choiceArray.push(title);
          });
          return choiceArray;
        },
        message: "What are you updating the employee role to?",
      })
      .then((answer) => {
//three nested qb queries:
        connection.query("SELECT * FROM employee", (err) => {
          if (err) throw err;
//snagging first_name out of our selection
          const nameArray = selectedEmployee.split(/(\s+)/);
          
//matching role id and index to update
          connection.query("SELECT title FROM role", (err, res) => {
            if (err) throw err;
            const TitleArray = [];
            res.forEach(({ title }) => {
              TitleArray.push(title);
            });
            const chosenRole = TitleArray.indexOf(answer.new_role);
//query to update role id foreign key by employee name
            connection.query( "UPDATE employee SET ? WHERE ? AND ?",
            [ {
              role_id: `${chosenRole + 1}`,
            },
            {
              first_name: `${nameArray[0]}`,
            },
            {
              last_name: `${nameArray[2]}`,
            }
          ],
              (err) => {
                if (err) throw err;
              }
            );
          });
        });
      })
      .then(() => {
        nextStep();
      });
  });
};

//ICE BOX
// const updateManager = () => {
//   inquirer
//     .prompt({
//       name: "new_manager",
//       type: "input",
//       message: "Who are you updating the employee's manager to?",
//     })
//     .then((answer) => {
//       connection.query(
//         `UPDATE employee SET manager_id = ${answer.new_manager} WHERE id = 1`,
//         (err, res) => {
//           if (err) throw err;
//           console.log(res);
//         }
//       );
//     })
//     .then(() => {
//       nextStep();
//     });
// };

// const updateSalary = () => {
//   inquirer
//     .prompt({
//       name: "salary",
//       type: "input",
//       message: "What are you updating the employee salary to?",
//       validate(value) {
//         if (isNaN(value) === false) {
//           return true;
//         }
//         return false;
//       },
//     })
//     .then((answer) => {
//       connection.query('SELECT * FROM employee', (err, res) => {
//         if (err) throw err;
//         const nameArray = selectedEmployee.split(/(\s+)/);
//         const chosenName = nameArray[0];

//       connection.query(
//         `UPDATE role SET salary = ${answer.salary} WHERE first_name = ${chosenName}`,
//         (err, res) => {
//           if (err) throw err;
//           console.log(res);
//         }
//       );
//     });
//     })
//     .then(() => {
//       nextStep();
//     });
// };

