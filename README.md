# SQL-Employer-Sleuth
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases.
These interfaces are called content management systems (CMS).
My objective is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

Because this application won’t be deployed, I’ll provide a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met.
I'll submit a link to the video and add it to the README of your project.

# User Story
- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business

# Acceptance Criteria
- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

# Technical Requirements
MySQL2 package is used to connect to the database.
Inquirer package is used to prompt the user for input.
Table module is used to format the output of the database.

# Packages

- https://www.npmjs.com/package/mysql2
- https://www.npmjs.com/package/inquirer
- https://www.npmjs.com/package/console.table

# Installation
~~~~~~~~~~
**** Please make sure your have nodeJS installed ****
!!!!! WARNING DO NO UPGRADE OR CHANGE THE package.json INQUIRER npm package.. ༼ つ ◕_◕ ༽つ ︵ ┻━┻ V9  !!!!!
!!!!! this code will not work with inquirer v9  as that version uses the new EMS system. Stay with V8 for now, until I figure it out later how to convert. !!!!!
!!!!! Also, make sure you're on the latest minor version of Node.js. At minimum Node.js 12.20, 14.14, or 16.0. !!!!!
!!!!! ESM can still import CommonJS packages, but CommonJS packages cannot import ESM packages synchronously. !!!!!
!!!!! ESM is natively supported by Node.js 12 and later. that npm package that drove me mad..lol (╯°□°）╯︵ ┻━┻┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻ !!!!!

- npm install mysql2 inquirer table
~~~~~~~~~~


# Database Setup
~~~~~~~~~~
**** please make sure you install mysql **** 
mysql -u root -p
Password: <your password>
drop database if exists employee_sleuth;
create database employee_sleuth;
show databases;
use employee_sleuth;
show full tables;
source db/schema.sql;
source db/seeds.sql;
show full tables;
select * from department;
select * from entitlement;
select * from employee;
~~~~~~~~~~

# Run
~~~~~~~~~
**** please make sure to change your password in the ./db/connection.js file ****
 $ npm start
~~~~~~~~~

# DEMO VIDEO
- youtube:
https://youtu.be/z5xUsUipvE0

- google drive
https://drive.google.com/file/d/18-pCs7eewuhqRMnVATyktGvHfQ2DkeP3/view?usp=sharing
- raw video in https://github.com/Niksharpkings/SQL-Employer-Sleuth/blob/main/assets/video/
# Table Setup
queries asynchronous

As the image illustrates, your schema should contain the following three tables:
--------------------------------
~~~~~~~~~
- department
- id: INT PRIMARY KEY
- name: VARCHAR(30) to hold department name 
- role
~~~~~~~~~
- id: INT PRIMARY KEY
- title: VARCHAR(30) to hold role title
- salary: DECIMAL to hold role salary
- department_id: INT to hold reference to department role belongs to
~~~~~~~~~
- employee
- id: INT PRIMARY KEY
- first_name: VARCHAR(30) to hold employee first name
- last_name: VARCHAR(30) to hold employee last name
- role_id: INT to hold reference to employee role
- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
~~~~~~~~~~

--------------------------------

- separate file that contains functions for performing specific SQL queries. 
- A constructor function or class for organizing these. 
- include a seeds.sql file.
- pre-populate the database for development of individual features much easier.

bonus:(optional) we be done in the upcoming months

- Update employee managers: Add a CLI command to allow the user to add a new employee to the database.

- View employees by manager:
-- add a feature to allow the user to view all employees by manager.

- View employees by department:
-- add a feature to allow the user to view all employees by department.

- Delete departments, roles, and employees: 
-- add a feature to allow the user to delete all departments, role, and employees.

- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department:
-- Add a feature to combine salaries of all employees in a department and there total
