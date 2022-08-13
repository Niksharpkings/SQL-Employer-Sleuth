const inquirer = require("inquirer");
const db = require('./db/connection');
// const consoleTable = require("console.table");
const CLOG = require('./assets/js/consoleText');


let query;

function startSleuth() {
  console.log(CLOG.clogIntro);
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
      console.log(`You Have Selected/Input'ed: ${answers.selection}`);
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
          viewProfession();
          break;
        case "View Employee":
          viewEmployee();
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
        message: "What Department Do You Want To Add?"
      }
    ).then((res) => {
      const { department } = res;
      query = `INSERT INTO department (name) VALUES ("${department}")`;
      dbQuery();
    });
}

const addProfession = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "profession",
        message: "What Profession Do You Want To Add?"
      },
      {
        type: "input",
        name: "salary",
        message: "What Is The Salary For This Profession?"
      },
      {
        type: "input",
        name: "department_id",
        message: "What Is The Department ID For This Profession?"
      }
    ])
    .then((res) => {
      const { profession, salary, department_id } = res;
      query = `INSERT INTO entitlement (profession, salary, department_id) VALUES ("${profession}","${salary}","${department_id}")`;
      dbQuery();
    });
};

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What Is The First Name Of The Employee?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What Is The Last Name Of The Employee?"
      },
      {
        type: "input",
        name: "profession_id",
        message: "What Is The Employee's Entitlement ID Of The Employee?"
      },
      {
        type: "input",
        name: "manager_id",
        message: "What Is The Manager ID Of The Employee?"
      }
    ]).then((res) => {
      const {
        first_name,
        last_name,
        profession_id,
        manager_id
      } = res;
      query = `INSERT INTO employee (first_name, last_name, profession_id, manager_id) VALUE ("${first_name}", "${last_name}", "${profession_id}", "${manager_id}")`;
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
        message: "What Employee Do You Want To Update? (Use Number From The profession_ID Column Only)"
      }
    );
}

const dbQuery = () => {
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startSleuth();
  })
}