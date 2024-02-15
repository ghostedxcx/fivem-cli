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
    message: 'Resource name: ',
    validate(answer) {
        if (answer.length < 1) {
            return 'Enter a resource name.'
        }

        return true
    }
})

project.setName(projectName)

let { features } = await inquirer.prompt([
    {
        type: 'checkbox',
        message: 'Select files to create they will be added to the project and structured for you.',
        name: 'FILES',
        choices: [
            { name: 'Client', value: 'client' },
            { name: 'Server', value: 'server' },
            { name: 'MySQL', value: 'mysql' },
            { name: 'NUI', value: 'nui' },
            { name: 'Config', value: 'config' },
            { name: 'QBClient', value: 'qbclient' },
            { name: 'QBServer', value: 'qbserver' },
            //{ name: 'OXCompatible', value: 'oxcompatible' },
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

figlet(':RESOURCE CREATED:', async function(err, data) {
    let rainbow = chalkAnimation.rainbow(data)
    await Utils.sleep(3000)

    rainbow.stop()

    console.clear()

})