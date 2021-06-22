//TODO:

//Joining tables to output- view

//at the very least, needs to:

//ONCE THIS TODO IS DONE, LOOK INTO BONUS MATERIAL
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
        "Delete employee",
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

        case "Delete employee":
          deleteEmployee();
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
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    nextStep();
  });
};

//methods to add employees, departments, roles, etc.
//TODO: put a wrapper query in to have a selection of pre-existing roles? or at least id-numbers to assign.
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
        console.log(answer.role_id);
        connection.query("SELECT title FROM role", (err, res) => {
          if (err) throw err;
          const titleArray = [];
          res.forEach(({ title }) => {
            titleArray.push(title);
          });
          const chosen = titleArray.indexOf(answer.role_id);
          console.log(chosen);
          connection.query(
            `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ('${
              answer.first
            }', '${answer.last}', '${answer.manager_id}', '${chosen + 1}')`,
            (err, res) => {
              if (err) throw err;
              console.log(res);
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
        (err, res) => {
          if (err) throw err;
        }
      );
    })
    .then(() => {
      nextStep();
    });
};

const addRole = () => {
  connection.query('SELECT * FROM department', (err, res) => {
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
      connection.query('SELECT name FROM department', (err, res) => {
        if (err) throw err;
        const nameArray = [];
        res.forEach(({ name }) => {
          nameArray.push(name);
        });
        const chosenDept = nameArray.indexOf(answer.dept_id);
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${chosenDept + 1}')`,
        (err, res) => {
          if (err) throw err;
          console.log(res);
        }
      );
    })
  })
    .then(() => {
      nextStep();
    });
  });

};

//updating rows
const updateEmployee = () => {
  connection.query("SELECT id FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employee",
          type: "rawlist",
          choices() {
            const choiceArray = [];
            res.forEach(({ id }) => {
              choiceArray.push(id);
            });
            return choiceArray;
          },
          message: "Which employee are you updating?",
        },
        {
          name: "update",
          type: "list",
          messages: "What would you like to update?",
          choices: ["Salary", "Role", "Manager", "Restart", "Exit"],
        },
      ])
      .then((answer) => {
        switch (answer.update) {
          case "Salary":
            updateSalary();
            break;

          case "Role":
            updateRole();
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

        console.log(answer);
      });
  });
};

//updating methods
const updateSalary = () => {
  inquirer
    .prompt({
      name: "salary",
      type: "input",
      message: "What are you updating the employee salary to?",
      validate(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
    })
    .then((answer) => {
      connection.query(
        `UPDATE role SET salary = ${answer.salary} WHERE id = 1`,
        (err, res) => {
          if (err) throw err;
          console.log(res);
        }
      );
    })
    .then(() => {
      nextStep();
    });
};

const updateRole = () => {
  inquirer
    .prompt({
      name: "new_role",
      type: "input",
      message: "What are you updating the employee title to?",
    })
    .then((answer) => {
      connection.query(
        `UPDATE role SET title = ${answer.new_role} WHERE id = 1`,
        (err, res) => {
          if (err) throw err;
          console.log(res);
        }
      );
    })
    .then(() => {
      nextStep();
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

const deleteEmployee = () => {
  // connection.query('SELECT first_name, last_name FROM employee', (err, res) =>{
  //   if (err) throw err;
  //   let choices = [this.res];
  //   inquirer
  //     .prompt({
  //       name: 'delete',
  //       type: 'list',
  //       message: 'Who would you like to remove?',
  //       choice: choices,
  //     })
  //     .then ((answer) => {
  //       console.log(answer.delete);
  //     })
  //   console.log(res);
  //   connection.end();
  // });
};
