
        
const MapDB = require('quickmap.db');
const db = require("quickmap.db")
module.exports = {
    name: "warn",
    onlyStaff: true,
    onlyOwner: false,
    description: "warnare un utente",
    tipo: "moderation",
    options: [{
        name: 'utente',
        description: "utente da warnare",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER,
    },
{
    
        name: 'motivo',
        description: "motivo per il warn",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
    
}],
    data: {
        name: "warn",
    onlyStaff: true,
    description: "warnare un utente",
    tipo: "moderation",
    options: [{
        name: 'utente',
        description: "utente da warnare",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER,
    },
    {
    name: 'motivo',
    description: "motivo per il warn",
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
}]},
   async execute(interaction) {

           
    db.users = new MapDB('users.json')
    db.guilds = new MapDB('guilds.json');
    //Dichiarazione costanti

    const targetUser = interaction.options.getUser("utente")
    const reason = interaction.options.getString("motivo") || "`Non specificato`";
    const warnings = db.users.get(`${interaction.guild.id}.${targetUser.id}.warns`) || 0
 
    db.users.set(`${interaction.guild.id}.${targetUser.id}.warns`, warnings + 1)

   setTimeout(() => {
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`${interaction.member} ha warnato un membro`)
    .setColor("RED")
    .addField("Utente", `${targetUser}`)
    .addField("Reason", `${reason}`)
    .addField("Warns", `${db.users.get(`${interaction.guild.id}.${targetUser.id}.warns`)}`)
    interaction.reply({content: `${targetUser.tag} warnato con successo ora ha ${db.users.get(`${interaction.guild.id}.${targetUser.id}.warns`)} warn`, ephemeral: true})
    client.channels.cache.get(db.guilds.get(`${interaction.guild.id}.log`)).send({ embeds: [embed] })
   }, 100)
 
                    }
                }
           
    