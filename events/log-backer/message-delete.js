const MapDB = require('quickmap.db');
const db = require("mongoose")
module.exports = {
    name: 'messageDelete',
    async execute(message){
        db.guilds = new MapDB('guilds.json');
if(db.guilds.get(`${message.guild.id}.log`)){
        var embed = new Discord.MessageEmbed()
        .setAuthor({name: `${message.author.tag} `, iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`Messaggio eliminato in <#${message.channel.id}> \n 📊**info**:\nContenuto:\n${message.content}\n\n `+"Canale: "+ "`"+message.channel.name+"`"+"\n"+"🆔**ID**:"+"```Utente: "+message.author.id+"\n"+ "Canale: "+message.channel.id+"\n"+ "Messaggio: "+message.id+"```")
        .setColor('RED')
        .setFooter({text: `${client.user.username} Logs  `, iconURL: client.user.displayAvatarURL()})
        .setTimestamp()
        var canale =  db.guilds.get(`${message.guild.id}.log`)
        client.channels.cache.get(canale).send({embeds: [embed]})}
        else  {return}
    }
}