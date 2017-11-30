#!/usr/bin/env node

const inquirer = require('inquirer');
const config = require('./config');
const exec = require('child_process').execSync;

const args = process.argv.slice(2);

inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter a name for the project: ',
    when: args.length === 0
}).then((value) => {
    let name = value['name'] || args[0];
    inquirer.prompt({
        type: 'list',
        name: 'starter',
        message: 'Select a starter: ',
        choices: config.starters.map(repo => repo.name)
    }).then((value) => {
        const starter = config.starters.find(repo => repo.name === value['starter']);

        if(!name) {
            name = starter.repo.substring(starter.repo.lastIndexOf('/') + 1, starter.repo.lastIndexOf('.git'))
        }

        exec(`git clone ${starter.repo} ${name}`, {stdio:[0,1,2]});

        if (starter.type === 'node') {
            console.log('Running npm install...');
            exec('npm install', { cwd: name, stdio: [0, 1, 2] });
        }
    });
});