const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employeeList = [];

userChoice();

function userChoice() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is your name?"
        },
        {
            name: "id",
            type: "input",
            message: "What is your ID?"
        },
        {
            name: "email",
            type: "input",
            message: "What is your email?"
        },
        {
            name: "officeNumber",
            type: "input",
            message: "What is your office number?"
        }]).then(
            inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    message: "Do you want to add a new employee?",
                    choices: ["Intern", "Engineer", "No"]
                }
            ])).then((answer) => {
                switch (answer.choice) {
                    case "Intern":
                        return createIntern();
                    case "Engineer":
                        return createEngineer();
                    case "No":
                        return htmlRender();
                    default:
                        break;
                };
            });
};

function createIntern() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is your intern's name?"
        },
        {
            name: "id",
            type: "input",
            message: "What is your intern's ID?"
        },
        {
            name: "email",
            type: "input",
            message: "What is your intern's email?"
        },
        {
            name: "school",
            type: "input",
            message: "What university does your intern attend?"
        }
    ]).then((answer) => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        employeeList.push(intern);
        userChoice();
    });
};

function createEngineer() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is your engineer's name?"
        },
        {
            name: "id",
            type: "input",
            message: "What is your engineer's ID?"
        },
        {
            name: "email",
            type: "input",
            message: "What is your engineer's email?"
        },
        {
            name: "github",
            type: "input",
            message: "What is your engineer's Github username?"
        }
    ]).then((answer) => {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        employeeList.push(engineer);
        userChoice();
    });
};

function htmlRender() {
    const html = render(employeeList);
    fs.writeFileSync(outputPath, html);
};

// returned from the `render` function. Now write it to a file named `team.html` in the
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```