
const MapDB = require('quickmap.db');
const db = require("mongoose")
module.exports = {
    name: "delete-server",
    onlyOwner: true,
    description: "Ellimina le impostazioni del tuo server!",
    data: {
        name: "delete-server",
        onlyOwner: true,
        description: "Ellimina le impostazioni del tuo server!",
    },

    async execute(interaction, guild) {
        if(!db.guilds.get(`${interaction.guild.id}.servername.${interaction.guild.name}`)){
            return interaction.reply({content: "Non hai configurato il tuo server, fai ``/setup`` per configurarlo ", ephemeral: true})
        }
        //DataBase ||
        db.users = new MapDB('users.json');
        db.guilds = new MapDB('guilds.json');
        db.credits = new MapDB('credits.json');


            await db.guilds.delete(`${interaction.guild.id}.servername.${interaction.guild.name}`)
            await db.guilds.delete(`${interaction.guild.id}.settings.welcomechannel`) 
            await db.guilds.delete(`${interaction.guild.id}.settings.verifychannel`) 
            await db.guilds.delete(`${interaction.guild.id}.settings.logbacker`) 
            await db.guilds.delete(`${interaction.guild.id}.settings.staffrole`) 
            await db.guilds.delete(`${interaction.guild.id}.settings.mainrole`) 
            await db.guilds.delete(`${interaction.guild.id}.log`)


        let settaggiocorretto = new Discord.MessageEmbed()
        .setTitle("Configurazione elliminata")
        .setDescription("Hai elliminato **correttamente** il tuo server!")
        .setColor("GREEN")
        interaction.reply({ embeds: [settaggiocorretto], ephemeral: true })
    }

}