const fs = require('fs');

/**
 * Clase para administrar eventos.
 * @class
 */
class Events {
    /**
     * Se envía el cliente al administrador.
     * @param {Client} client Cliente del bot.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Se cargan los eventos de un directorio específico
     * @param {string} directory Directorio de los eventos
     */
    async load(directory) {
        try {
            if (!fs.existsSync(directory)) fs.mkdirSync(directory);
            let eventsFiles = fs.readdirSync(directory);
            eventsFiles.forEach((ev) => {
                if (!ev.endsWith(".js")) return;
                let eventName = ev.split('.')[0];
                let eventClass = require(directory + '/' + ev);
                if (!eventClass) return;
                let event = new eventClass(this.client);
                this.client.on(eventName, (...args) => event.run(...args));
            });
        } catch (e) {
            let helpuError = new Error("\u001b[31mHubo un error al cargar un comando, por favor verifica que estén bien creados.\nReferencia: " + e + "\u001b[0m");
            helpuError.name = "\u001b[1m\u001b[36mHelpuError\u001b[0m";
            throw helpuError;
        }
    };
};

module.exports = Events;