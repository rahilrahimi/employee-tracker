const inquirer = require("inquirer");

const queries = {
    viewEmployees: `SELECT e.id, e.first_name, e.last_name, r.title, departments.department_name as department, r.salary, IFNULL(emp.last_name,'no manager') as manager 
                    FROM employees e
                    LEFT JOIN roles r     
                    ON r.id = e.role_id
                    JOIN departments 
                    ON r.department_id = departments.id
                    LEFT JOIN employees emp
                    ON emp.id = e.manager_id;`,
    viewDepartments: `SELECT * FROM departments`,
    viewRoles: `SELECT r.id, r.title, r.salary, d.department_name as department
                FROM roles r
                JOIN departments d
                ON d.id = r.department_id;`,
    addDepartment: `INSERT INTO departments (department_name) VALUES (?);`,
    addRole: `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`,
    addEmployee: `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
    updateEmployee: `UPDATE employees 
                    SET role_id = ?
                    WHERE id = ?`,


}

//Query constructor
class Query {
    constructor(db) {
        this.db = db;
    }

    //VIEW DEPARTMENTS
    viewDepartments = function (main) {
        this.db.query(queries.viewDepartments, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            main();
        });
    }

    //VIEW EMPLOYEES
    viewEmployees = function (main) {
        this.db.query(queries.viewEmployees, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(rows);

            main();
        });
    }
    getEmployees = function (cb) {
        this.db.query(queries.viewEmployees, (err, rows) => {
            if (err) {
                console.log(err.message);
                return cb(null, Error("Unable to query employees"));
            }

            console.table(rows);

            cb(rows);
        });
    }
    // VIEW ROLES
    viewRoles = function (main) {
        this.db.query(queries.viewRoles, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            main();
        });
    }

    getDepartments = function (cb) {
        this.db.query(queries.viewDepartments, (err, rows) => {
            if (err) {
                console.log(err.message);
                return cb(null, Error('Bad'));
            }
            cb(rows);
        });
    }
    getRoles = function (cb) {
        this.db.query(queries.viewRoles, (err, rows) => {
            if (err) {
                console.log(err.message);
                return cb(null, Error('Bad'));
            }
            console.table(rows);
            cb(rows);
        });
    }

    // ADD DEPARTMENT
    addDepartment = function getDepartmentInfo(main) {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the department name?"
        },
        ])
            .then(({ name }) => {
                console.log(name);

                this.db.query(queries.addDepartment, [name], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.log('New department successfully added!');
                    main();
                });
            })
    }

    //ADD ROLE
    addRole = function getRoleInfo(main) {
        inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the title of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "select the department id for this role",
            choices: () => {
                return new Promise((resolve, reject) => {
                    this.getDepartments((depts, error) => {
                        console.log(error);
                        if (error) return reject(error);
                        resolve(depts.map((dept) => ({
                            name: dept.department_name,
                            value: dept.id
                        })));
                    });
                });
            }
        }
        ])
            .then(({ title, salary, department_id }) => {

                this.db.query(queries.addRole, [title, salary, department_id], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        return addRole(main);
                    }
                    else {
                        console.log('New role successfully added');
                        return main();
                    }
                    
                });
            });
    }//END ADD ROLE

    // ADD EMPLOYEE
    addEmployee = function getEmployeeInfo(main) {
        inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: () => {
                return new Promise((resolve, reject) => {
                    this.getEmployees((rows, error) => {
                        if (error) return reject(error);
                        // console.log(rows);
                        resolve(rows.map((employee) => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id
                        })));
                    });
                });
            }
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: () => {
                return new Promise((resolve, reject) => {
                    this.getRoles((roles, error) => {
                        if (error) return reject(error);
                        resolve(roles.map((role) => ({
                            name: role.title,
                            value: role.id
                        })));
                    });
                });
            }
        },
      
        ])
            .then(({ first_name, last_name, role_id, manager_id }) => {

                this.db.query(queries.addEmployee, [first_name, last_name, role_id, manager_id], (err, rows) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    console.log('Employee successfully added!');
                    main();
                });

            })
    }//END ADD EMPLOYEE

    // UPDATE EMPLOYEE ROLE
    updateEmployee = function getUpdatedEmployeeInfo(main) {
        //anonymous function 
        // this.getEmployees((rows) => {
        //     console.log(rows);
            inquirer.prompt([{
                type: "list",
                name: "employee",
                message: "Select an employee to update.",
                choices: () => {
                    return new Promise((resolve, reject) => {
                        this.getEmployees((rows, error) => {
                            if (error) return reject(error);
                            console.log('emps', rows);
                            resolve(rows.map((employee) => ({
                                name: `${employee.first_name} ${employee.last_name}`,
                                value: employee.id
                            })));
                        });
                    });
                },
            },
            {
                type: "list",
                name: "new_role",
                message: "Select the employee's new role.",
                choices: () => {
                    return new Promise((resolve, reject) => {
                        this.getRoles((roles, error) => {
                            if (error) return reject(error);
                            resolve(roles.map((role) => ({
                                name: role.title,
                                value: role.id
                            })));
                        });
                    });
                }
                },
            ])
                .then(({ employee, new_role }) => {
                    this.db.query(queries.updateEmployee, [new_role, employee], (err, rows) => {
                        if (err) {
                            console.log(err.message);
                            return;
                        }
                        console.log('Employee updated!');
                        main();
                    });
                })
        // })

    
    }

}

module.exports = Query;