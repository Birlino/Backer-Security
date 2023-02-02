
        
const MapDB = require('quickmap.db');
const db = require("quickmap.db")
module.exports = {
    name: "warnings",
    onlyStaff: true,
    onlyOwner: false,
    description: "le warn di un utente",
    tipo: "moderation",
    options: [{
        name: 'utente',
        description: "utente da vedere per le warn",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER,
    },],
    data: {
        name: "warnings",
        onlyStaff: true,
        onlyOwner: false,
        description: "le warn di un utente",
        tipo: "moderation",
        options: [{
            name: 'utente',
            description: "utente da vedere per le warn",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
        },],},
   async execute(interaction) {
         
           
    db.users = new MapDB('users.json')
        
    //Dichiarazione costanti

    const targetUser = interaction.options.getUser("utente")
    const warnings = db.users.get(`${interaction.guild.id}.${targetUser.id}.warns`) 


    
    

    const embed = new Discord.MessageEmbed()
    //.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`${interaction.member} le warn di questo membro`)
    .setColor("RED")
    .addField("Warns", `${warnings}`)
    await interaction.reply({ embeds: [embed], ephemeral: true })
                    }
                }
           
    