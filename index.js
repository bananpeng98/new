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
            name = starter.name;
        }

        const command = starter.command.replace(new RegExp('\{\{name\}\}', 'g'), name);
        
        exec(command, {stdio:[0,1,2]});

        starter.install.forEach(installer => {
            console.log(`Running ${installer}...`);
            exec(installer.replace(new RegExp('\{\{name\}\}', 'g'), name), { cwd: name, stdio: [0, 1, 2] });
        });
    });
});