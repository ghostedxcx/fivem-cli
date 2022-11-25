#!/usr/bin/env node

import inquirer from 'inquirer'
import Project from './Project.js'
import figlet from 'figlet'
import chalkAnimation from 'chalk-animation'
import Utils from './Utils.js'

let project = new Project()

let { projectName } = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: 'Project name: ',
    validate(answer) {
        if (answer.length < 1) {
            return 'You must enter a project name.'
        }

        return true
    }
})

project.setName(projectName)

let { features } = await inquirer.prompt([
    {
        type: 'checkbox',
        message: 'Select features to create they will be added to the project and structured for you.',
        name: 'features',
        choices: [
            { name: 'Client', value: 'client' },
            { name: 'Server', value: 'server' },
            { name: 'MySQL', value: 'mysql' },
            { name: 'NUI', value: 'nui' },
            { name: 'Config', value: 'config' },
        ],
        validate(answer) {
            if (answer.length < 1) {
                return 'You must select at least one feature.'
            }

            return true
        }
    },
])

project.setComponents(features)

project.build()

console.clear()

figlet('Project created successfully', async function(err, data) {
    let rainbow = chalkAnimation.rainbow(data)
    await Utils.sleep(3000)

    rainbow.stop()

    console.clear()
})