const inquirer = require("inquirer");
// const db = require('./db/connection');
// const consoleTable = require("console.table");
 const CLOG = require('./assets/js/consoleText');

const mysql = require("mysql2");
// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "$!NSAmySQL92",
  database: "employee_sleuth"
});

let query;

function startSleuth() {
  
  return inquirer
    .prompt({
      type: "list",
      name: "selection",
      message:`
      =================================================
      ϟ---------- What Would You Like To Do? ---------ϟ
      =================================================
      `,
      choices: [
        "Add Department",
        "Add Profession",
        "Add Employee",
        "View Department",
        "View Profession",
        "View Employee",
        "Update Employees Profession",
        "Exit"
      ],
      validate: (validation) => {
        return validation === "Exit";
      }
    })
    .then((answers) => {
      console.log(`
      =================================================
      ϟ------- You Picked ${answers.selection} -------ϟ
      =================================================
      `);
      switch (answers.selection) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Profession":
          addProfession();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "View Profession":
          viewProfession()
          break;
        case "View Employee":
          viewEmployee()
          break;
        case "Update Employees Profession":
          updateProfession();
          break;
        case "Exit":
          console.log(CLOG.clogOUTRO);
          db.end();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt(
      {
        type: "input",
        name: "department",
        message:
          `
      =================================================
      ϟ----- What Department Do You Want To Add? -----ϟ
      =================================================
      `}
    ).then((res) => {
      const { department } = res;
      query = `INSERT INTO department (name) VALUES ("${department}")`;
      dbQuery();
    });
}

function addProfession() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "profession",
        message: `
        =================================================
        ϟ----- What Profession Do You Want To Add? -----ϟ
        =================================================
        `,
        validate: (validate) => {
          if (!validate) {
            return "Please Input A Profession's title";
          }
          return true;
        }
      },
      {
        type: "input",
        name: "salary",
        message(answer) {
          return `
          =================================================
          ϟ- What Is The Salary For ${answer.profession}?-ϟ
          =================================================
          `
        },
        // validate: (answer) => {
        //   if (answer) {
        //     return "Please Input A Valid Salary Number";
        //   }
        //   return true;
        // }
      },
      {
        type: "input",
        name: "department_id",
        message(answer) {
          return `
          =================================================
          ϟ-What Is The Department ID For ${answer.profession}?-ϟ
          =================================================`
        },
        // validate: (answer) => {
        //   if (!answer) {
        //     return "Please Input A Valid Department ID number";
        //   }
        //   return true;
        // }
      }
    ])
    .then((res) => {
      const { profession, salary, department_id } = res;
      query = `INSERT INTO entitlement (profession, salary, department_id) VALUES ("${profession}","${salary}","${department_id}")`;
      dbQuery();
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: `
        =================================================
        ϟ--- What Is The First Name Of The Employee? ---ϟ
        =================================================
        `,
        validate: (validate) => {
          if (!validate) {
            return "Please Input A First Name";
          }
          return true;
        }
      },
      {
        type: "input",
        name: "last_name",
        message(answer) {
          return `
        =================================================
        ϟ- ${answer.first_name}, and the Last Name Of The Employee? -ϟ
        =================================================
`
        },
        validate: (answer) => {
          if (!answer) {
            return "Please Input A Last Name";
          }
          return true;
        }
      },
      {
        type: "input",
        name: "profession_id",
        message(answer) {
          return `
          =================================================
          ϟ- What Is ${answer.last_name}, ${answer.first_name} Entitlement ID Of The Employee? -ϟ
          =================================================
          `
        },
        validate: (answer) => {
          if (!answer) {
            return "Please Input A Valid Entitlement ID Number";
          }
          return true;
        }
      },
      {
        type: "input",
        name: "manager_id",
        message(answer) {
          return `
          =================================================
          ϟ- What Is ${answer.last_name}, ${answer.first_name} Manager ID Of The Employee? -ϟ
          =================================================
`
        },
        validate: (answer) => {

          if (!answer) {
            return "Please Input A Valid Manager ID Number";
          }
          return true;
        }
      }
    ]).then((res) => {
      const {
        first_name,
        last_name,
        profession_id,
        manager_id
      } = res;
      query = `INSERT INTO employee (
        first_name,
        last_name,
        profession_id,
        manager_id) VALUE (
          "${first_name}",
          "${last_name}",
          "${profession_id}",
          "${manager_id}"
          )`;
      dbQuery();
    });
}

function viewDepartment() {
  query = "SELECT * FROM department";
  dbQuery();
}

function viewProfession() {
  query = "SELECT * FROM entitlement";
  dbQuery();
}

function viewEmployee() {
  query = "SELECT * FROM employee";
  dbQuery();
}

function updateProfession() {
  query = "SELECT entitlement_id, first_Name, last_Name, profession_id FROM employee";
  dbQuery();
  inquirer
    .prompt(
      {
        type: "input",
        name: "employee",
        message: `
        =================================================
        ϟ- What Employee Do You Want To Update? *Use The profession_ID Number Only* -ϟ
        =================================================
        `,
        validate: (answer) => {
          if (!answer) {
            return "Please Input A profession_ID number that matches to the employee you want to edit";
          }
          return true;
        }
      }
    );
}

function dbQuery() {
  db.query(query, (err, res) => {
    if (err)
      throw err;
    console.table(res);
    startSleuth();
  });
}

db.connect(function(err) {
  if (err) throw err;
  console.log(CLOG.clogIntro);
  console.log(CLOG.clogTPG);
  startSleuth();
});