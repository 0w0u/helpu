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
        if (!fs.existsSync(directory)) fs.mkdirSync(directory);
        let eventsFiles = fs.readdirSync(directory);
        eventsFiles.forEach((ev) => {
            let eventName = ev.split('.')[0];
            let eventClass = require(directory + '/' + ev);
            let event = new eventClass(this.client);
            this.client.on(eventName, (...args) => event.run(...args));
        });
    }
}

module.exports = Events;