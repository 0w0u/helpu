const Commands = require("../UtilsPrivate/Commands.js");
const Events = require("../UtilsPrivate/Events.js");
const { Client } = require("discord.js");
const fs = require("fs");

/**
 * Cliente de Helpu
 * @class
 * @extends {Client}
 */
class HelpuClient extends Client {
    /**
     * Se establecen las opciones del cliente.
     * @param {object} options Las opciones del cliente.
     * @param {string} options.prefix Prefijo del bot global.
     * @param {?string} options.supportServer Servidor de ayuda.
     * @param {?string} options.errorsChannel Canal en el cual se envian los errores.
     * @param {Array} options.botOwners Dueños del bot los cuales podrán tener acceso comandos privados.
     * @param {?object} options.messages Mensajes predeterminados de las prohibiciones. (Ejemplo: ownerOnly, nsfwOnly, etc...)
     * @param {?string} options.messages.ownerOnly Mensaje predeterminado de incumplimiento 'ownerOnly'.
     * @param {?string} options.messages.serverOnly Mensaje predeterminado de incumplimiento 'serverOnly'.
     * @param {?string} options.messages.nsfwOnly Mensaje predeterminado de incumplimiento 'nsfwOnly'.
     */
    constructor(options) {
        super(options);
        /**
         * Prefijo del bot global.
         * @type {string}
         */
        this.prefix = options.prefix;
        /**
         * Tiempo de espera para el próximo uso del comando.
         * @type {number}
         */
        this.cooldown = options.cooldown; 
        /**
         * Eventos del bot.
         * @type {Events}
         */
        this.events = new Events(this);
        /**
         * Colección de comandos.
         * @type {Commands}
         */
        this.commands = new Commands(this);
        /**
         * Servidor de ayuda. (Opcional)
         * @type {?string}
         */
        this.supportServer = typeof options.supportServer === "string" ? options.supportServer : null;
        /**
         * Canal en el cual se envian los errores. (Opcional)
         * @type {?string}
         */
        this.errorsChannel = typeof options.errorsChannel === "string" ? options.errorsChannel : null;
        /**
         * Dueños del bot los cuales podrán tener comandos privados.
         * @type {Array}
         */
        this.botOwners = options.botOwners instanceof Array ? options.botOwners : [];
        /**
         * Mensajes predeterminados de las prohibiciones. (Ejemplo: ownerOnly, nsfwOnly, etc...)
         * @type {?object} 
         * @property {?string} ownerOnly
         * @property {?string} serverOnly
         * @property {?string} nsfwOnly
         */
        this.messages = options.messages;
        /**
         * Administrador de comandos
         * @listens message
         */
        this.on("message", message => {
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;
            const args = message.content
                .slice(this.prefix.length)
                .trim()
                .split(/ +/g);
            const command = args.shift().toLowerCase();
            const cmd = this.commands.find(c => c.name === command || c.aliases.includes(command));
            const cooltimer = this.cooldown;
            const cooldown = new Set();
            
            if (cooldown.has(message.author.id) && cooldown.has(cmd)){
                return message.channel.send("¡Espera un poco antes de volver a usar este comando!").then(m => {
                    m.delete(3500)
            })
            }
            try {
                if (!cmd) return;
                
                cooldown.add(message.author.id)
                cooldown.add(cmd)
                setTimeout(() => {
                    cooldown.delete(message.author.id)
                    cooldown.delete(cmd)
                }, cooltimer)
        
                if (cmd.ownerOnly === true && !this.botOwners.includes(message.author.id)) {
                    return message.channel.send(this.messages.ownerOnly ? this.messages.ownerOnly : '¡Este comando es solo para dueños!')
                } else if (cmd.serverOnly === true && !message.guild) {
                    return message.channel.send(this.messages.serverOnly ? this.messages.serverOnly : '¡Este comando solo se puede usar en sevidores!')
                } else if (cmd.nsfwOnly === true && !message.channel.nsfw) {
                    return message.channel.send(this.messages.nsfwOnly ? this.messages.nsfwOnly : '¡Este comando solo se puede usar en canales NSFW!')
                }
                cmd.run(message, args);
            } catch (e) {
                let errChannel = this.channels.get(this.errorsChannel);
                if (errChannel) errChannel.send("Nuevo error");
                throw new Error(`¡Ha ocurrido un error al ejecutar un comando!\nError: ${e.toSring()}`);
            }
        });
    }
}

module.exports = HelpuClient;
