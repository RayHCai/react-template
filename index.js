#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const chalk = require('chalk');

const projectName = process.argv[2];

if (!projectName) throw Error(chalk.red('Please specify a project name.'));

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, { recursive: true });

const projectPackageJson = require(path.join(projectDir, 'package.json'));

// Update the project's package.json with the new project name
projectPackageJson.name = projectName;

fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
);

spawn.sync('yarn', { stdio: 'inherit', cwd: projectDir });

console.log(chalk.green('Success! Your new project is ready.'));
console.log(`Created ${ projectName } at ${ projectDir }`);
