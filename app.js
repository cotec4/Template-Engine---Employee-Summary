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

newManager();

function validate(email) {
    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (!valid) {
        console.log("\nPlease enter a valid email address");
        return false;
    }
    return true;
}

function newManager() {
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
            message: "What is your email?",
            validate: (email) => validate(email)
        },
        {
            name: "officeNumber",
            type: "input",
            message: "What is your office number?"
        }]).then((response) => {
            const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
            employeeList.push(manager);
            choices();
        });
};

function choices() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Do you want to add a new employee?",
            choices: ["Intern", "Engineer", "No"]
        }
    ]).then((response) => {
        const choice = response.choice;
        switch (choice) {
            case "Intern":
                createIntern();
                break;
            case "Engineer":
                createEngineer();
                break;
            case "No":
                htmlRender();
                break;
            default:
                break;
        };
    });

}

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
            message: "What is your intern's email?",
            validate: (email) => validate(email)
        },
        {
            name: "school",
            type: "input",
            message: "What university does your intern attend?"
        }
    ]).then((answer) => {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        employeeList.push(intern);
        choices();
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
            message: "What is your engineer's email?",
            validate: (email) => validate(email)
        },
        {
            name: "github",
            type: "input",
            message: "What is your engineer's Github username?"
        }
    ]).then((answer) => {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        employeeList.push(engineer);
        choices();
    });
};

function htmlRender() {
    const html = render(employeeList);
    fs.writeFile(outputPath, html, (err) => {
        if (err) console.log(err);
        else console.log("Here's your team!");
    });
};