const components = {

    base: "fx_version \"cerulean\"\ngames {\"gta5\"}\n\n\n",

    server: "server_scripts {\n\t'server/*.lua'\n}\n\n",

    client: "client_scripts {\n\t'client/*.lua'\n}\n\n",

    config: "shared_scripts {\n\t'config.lua'\n}\n\n",

    nui: "files {\n\t'ui/img/*',\n\t'ui/css/*.css',\n\t'ui/index.html',\n\t'ui/fonts/*',\n}\n\nui_page 'ui/index.html'\n\n",

    qbclient: "client_scripts {\n\t'qbclient/*.lua'\n}\n\n",

    qbserver: "server_scripts {\n\t'qbserver/*.lua'\n}\n\n",

}

class FxManifest {

    manifest = ""

    addComponent(name) {
        if(!components[name])
            return
        this.manifest += components[name]
        return this
    }

    build() {
        return this.manifest
    }

}

export default FxManifest
