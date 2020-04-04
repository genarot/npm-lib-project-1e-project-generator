#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const shelljs = require('shelljs');
const render = require('./utils/templates').render;


const TEMPLATE_OPTIONS = fs.readdirSync(path.join(__dirname, 'templates'));

const QUESTIONS = [
    {
        name: "TEMPLATE",
        type: "list",
        choices: TEMPLATE_OPTIONS,
        message: "What type of project are you going to build?",
    },
    {
        name: "PROJECT_NAME", type: "input", message: "What is the name of the project?",
        validate: function (input) {
            if (/^([a-z@]{1}[a-z\-\\\/0-9]{0,213})+$/g.test(input)) {
                return true
            }
            return 'The name project name length must be between 1 and 214 and also it must start with lowercase or at'
        }
    }
];

const CURRENT_DIR = process.cwd();

inquirer.prompt(QUESTIONS)
    .then(answers => {
        const {PROJECT_NAME, TEMPLATE} = answers;
        const templatePath = path.join(__dirname, '/templates', TEMPLATE);
        const targetPath = path.join(CURRENT_DIR, PROJECT_NAME);

        createProject(targetPath);
        createDirectoriesFilesAndContent(templatePath, PROJECT_NAME);
        // fs.mkdirSync(templatePath);
        postProcess(templatePath, targetPath)
    })
    .catch(_err => {
        console.log('error', _err)
    });

// /console.log(chalk.green('que nota prro'), TEMPLATE_OPTIONS);


function createProject(projectPath) {
    //To check that the directory doesn't exist
    if (fs.existsSync(projectPath)) {
        console.log(chalk.red('We couldn\'t create the project with the provided name, because already exist a folder with that name in the current directory!'));
        return false;
    }

    fs.mkdirSync(projectPath);
    return true
}

function createDirectoriesFilesAndContent(templatePath, projectName) {
    const listFilesAndDirectories = fs.readdirSync(templatePath);

    listFilesAndDirectories.forEach(item => {
        if (item === 'dist') {
            return
        }
        const originalPath = path.join(templatePath, item);
        const stats = fs.statSync(originalPath);

        const targetPath = path.join(CURRENT_DIR, projectName, item);
        if (stats.isFile()) {
            let content = fs.readFileSync(originalPath, 'utf-8');
            content = render(content, {projectName});
            // Additional information
            const CREATE = chalk.green('CREATE ');
            const size = stats['size'];
            console.log(`${CREATE} ${targetPath} (${size}) bytes`);
            fs.writeFileSync(targetPath, content, 'utf-8')
        } else if (stats.isDirectory()) {
            fs.mkdirSync(targetPath);
            createDirectoriesFilesAndContent(originalPath, path.join(projectName, item))
        }
    });
}

function postProcess(templatePath, targetPath) {
    const packageJSONPath = path.join(templatePath, 'package.json');
    const isNodeProject = fs.existsSync(packageJSONPath);
    if (isNodeProject) {
        shelljs.cd(targetPath);
        console.log(chalk.green('Installing project dependencies into ' + targetPath));
        const result = shelljs.exec('npm install');
        if (result !== 0) {
            return false
        }
    }
}
