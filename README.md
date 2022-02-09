# employee-tracker2# note-taker

## Description
this is a command-line application that accepts user input to manage a company's employee database. AS a business owner you will be able to view and manage the departments, roles, and employees in your company. Therefor, you can organize and plan your business.

## Table of Contents 

1. [Installations & Dependencies](##Installations-And-Dependencies)

2. [Usage](##Usage) 

## Technologies Used
Node.js
Inquirer
MySQL

## As a User
Clone the repo

Install dependencies: npm install

Update connection.js with mysql credentials

Add .env file with mysql credentials

Run mysql shell: source db/db.sql

Creating and seeding database using mysql to create the table for database "source db.sql" and seeds data by "seeds.sql" then we can start the app by using npm start

## App Criteria
WHEN I start the application

THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments

THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles

THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees

THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department

THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role

THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee

THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

WHEN I choose to update an employee role

THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Mock-Up Demo
https://watch.screencastify.com/v/qNmiwiZmg7n4NUmL7Dpg



