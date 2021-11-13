const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

//import queries from QUERY
const Query = require("./lib/query")

//assign db query to query variable
const query = new Query(db);

//initial prompt for desired user action
const questions = {
    main: [
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: ["view departments", "view employees", "view roles", "add a department", "add a role", "add an employee", "update an employee", "Exit"],
            loop: false
        }
    ]
}

//call query method depending on selected user action
function main() {
    console.count()
    inquirer.prompt(questions.main)
        .then(({ action }) => {
            switch (action) {
                case "view departments":
                    query.viewDepartments(main)
                    break;
                case "view employees":
                    query.viewEmployees(main)
                    break;
                case "view roles":
                    query.viewRoles(main);
                    break;
                case "add a department":
                    query.addDepartment(main);
                    break;
                case "add a role":
                    query.addRole(main);
                    break;
                case "add an employee":
                    query.addEmployee(main);
                    break;
                case "update an employee":
                    query.updateEmployee(main);
                    break;
                default:
                    process.exit(0);
            }
        });

}

//CALL main function on load
main();