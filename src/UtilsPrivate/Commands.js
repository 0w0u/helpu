const { Collection } = require('discord.js');
const fs = require('fs');

/**
 * Clase para administrar comandos.
 * @class
 */
class Commands extends Collection {
    /**
     * Se envía el cliente al administrador.
     * @param {Client} client Cliente del bot.
     */
    constructor(client) {
        super();
        this.client = client;
    }

    /**
     * Se cargan los comandos de un directorio específico
     * @param {string} directory Directorio de los comandos
     */
    async load(directory) {
        if (!fs.existsSync(directory)) fs.mkdirSync(directory);
        let cmdCategories = fs.readdirSync(directory);
        cmdCategories.forEach((category) => {
            let cmds = fs.readdirSync(directory + "/" + category);
            if (category.includes(".")) return;
            cmds.forEach((cmd) => {
                if (!cmd.endsWith(".js")) return;
                let cmdClass = require(directory + "/" + category + "/" + cmd);
                this.set(cmd.split(".")[0], new cmdClass(this.client));
            });
        });
    };
};

module.exports = Commands;