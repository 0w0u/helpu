/**
 * Base utilizada para la creación de eventos.
 * @class
 */
class Event {
    /**
     * Se le define el cliente.
     * @param {Client} client El cliente.
     */
    constructor(client) {
        this.client = client;
    }
}

module.exports = Event;