/**
 * Clase utilizada de base para la creación de comandos.
 * @class
 */
class Command {
    /**
     * Se establece la configuración del comando.
     * @constructor
     * @param {Client} client El cliente.
     * @param {object} configuration Configuración del comando.
     * @param {string} configuration.name Nombre del comando.
     * @param {string} configuration.usage Uso del comando.
     * @param {string} configuration.example Ejemplo de uso del comando.
     * @param {string[]} configuration.aliases Otros nombres para el comando.
     * @param {number} configuration.cooldown Tiempo de espera para su otro uso.
     * @param {boolean} configuration.ownerOnly Comando que solo puede ser utilizado por dueños del bot.
     * @param {boolean} configuration.nsfwOnly Comando que solo puede ser utilizado en canales NSFW.
     * @param {serverOnly} configuration.serverOnly Comando que solo puede ser utilizado en servidores.
     */
    constructor(client, configuration) {
        /**
         * Se define el cliente en el propio comando.
         * @type {Client}
         */
        this.client = client;
        /**
         * Nombre el comando.
         * @type {string}
         */
        this.name = configuration.name;
        /**
         * Descripción del comando.
         * @type {string}
         */
        this.description = configuration.description;
        /**
         * Uso del comando.
         * @type {string}
         */
        this.usage = configuration.usage;
        /**
         * Ejemplo de uso del comando.
         * @type {string}
         */
        this.example = configuration.example;
        /**
         * Otros nombres para el comando.
         * @type {string[]}
         */
        this.aliases = configuration.aliases;
        /**
         * Tiempo de espera para su otro uso.
         * @type {number}
         */
        this.cooldown = configuration.cooldown; 
        /**
         * Comando que solo puede ser utilizado por dueños del bot.
         * @type {boolean}
         */
        this.ownerOnly = configuration.ownerOnly;
        /**
         * Comando que solo puede ser utilizado en canales nsfw.
         * @type {boolean}
         */
        this.nsfwOnly = configuration.nsfwOnly;
        /**
         * Comando que solo puede ser utilizado en servidores.
         * @type {boolean}
         */
        this.serverOnly = configuration.serverOnly;
    }
}

module.exports = Command;