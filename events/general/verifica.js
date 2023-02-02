const MapDB = require('quickmap.db');
const db = require("quickmap.db")

/*module.exports = {
    name: 'messageCreate',
    async execute(message){
        
        if(message.content.startsWith(`${prefix}verifica`)) {
            message.delete()

            db.guilds = new MapDB('guilds.json');
            const verificachannel = db.guilds.get(`${message.guild.id}.settings.verifychannel`)
            const embed = new Discord.MessageEmbed()
                .setTitle("Verificati")
                .setDescription(`Attenzione: Verificandosi si accetteranno automaticamente le regole.`)
                .setColor('RED')
            var button1 = new Discord.MessageButton()
                .setLabel("Verificati")
                .setCustomId("verificac")
                .setStyle("PRIMARY")
                .setEmoji("✅")
    
            var row = new Discord.MessageActionRow()
                .addComponents(button1)
    
          client.channels.cache.get(verificachannel).send({ embeds: [embed], components: [row] })};

        }
    }*/
