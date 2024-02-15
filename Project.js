import fs from 'fs'
import FxManifest from './templates/FxManifest.js'

class Project {

    projectName = ""
    projectComponents = []

    setName = (name) => {
        this.projectName = name
    }

    setComponents = (components) => {
        this.projectComponents = components
    }

    async build() {
        fs.mkdirSync(this.projectName)
        let fxmanifest = new FxManifest()
        fxmanifest.addComponent('base')
        for(const component of this.projectComponents) {
            fxmanifest.addComponent(component)
            if(component == 'client' || component == 'server') {
                fs.mkdirSync(`${this.projectName}/${component}`)
                fs.writeFileSync(`${this.projectName}/${component}/${component}.lua`, '')
            } else if(component == 'mysql') {
                fs.mkdirSync(`${this.projectName}/SqlFiles`)
                fs.writeFileSync(`${this.projectName}/SqlFiles/structure.sql`, '')
            } else if(component == 'nui') {
                fs.mkdirSync(`${this.projectName}/ui`)
                fs.writeFileSync(`${this.projectName}/ui/index.html`, '')
                fs.mkdirSync(`${this.projectName}/ui/css`)
                fs.writeFileSync(`${this.projectName}/ui/css/style.css`, '')
                fs.mkdirSync(`${this.projectName}/ui/js`)
                fs.writeFileSync(`${this.projectName}/ui/js/index.js`, '')
                fs.mkdirSync(`${this.projectName}/ui/img`)
                fs.mkdirSync(`${this.projectName}/ui/fonts`)
            } else if(component == 'config') {
                fs.writeFileSync(`${this.projectName}/config.lua`, 'Config or Config = {}')
            } else if (component == 'qbclient' || component == 'qbserver') {
                fs.mkdirSync(`${this.projectName}/${component}`)
                fs.writeFileSync(`${this.projectName}/${component}/${component}.lua`, `local QBCore = exports['qb-core']:GetCoreObject()`)
            } else if (component == 'oxcompatible') {
                console.log("Resource Now Ox-Compatible.")
            }

        }
        fs.writeFileSync(`${this.projectName}/fxmanifest.lua`, fxmanifest.build())
    }
}

export default Project