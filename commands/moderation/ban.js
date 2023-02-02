const MapDB = require('quickmap.db');
const db = require("quickmap.db")
module.exports = {
    name: "ban",
    onlyOwner: true,
    tipo: "moderation",
    description: "Banna un utente",
    options: [{
        name: 'utente',
        description: "utente da bannare",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER,
    },
    {
        name: 'motivo',
        description: "motivo del ban",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
    }],
    data:{
    name: "ban",
    onlyOwner: true,
    description: "Banna un utente",
    tipo: "moderation",
    options: [{
        name: 'utente',
        description: "utente da bannare",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER,
    },
    {
        name: 'motivo',
        description: "motivo del ban",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
    }]},
    async execute(interaction) {
        var staffer = interaction.user.tag
        var user = interaction.options.getMember('utente');
        var motivo = interaction.options.getString('motivo');
        if (!motivo) motivo = "Nessun motivo specificato";
        db.guilds = new db('guilds.json');
       

        var embed = new Discord.MessageEmbed()
            .setTitle("Ban")
            .setDescription(`Sei stato stato bannato per: ${motivo}`)
            .setFooter(moment(new Date().getTime()).locale("it").format("ddd DD MMM, HH:mm:ss"))
            .setColor("#FF0000");
            

        user.send({ embeds: [embed] }).catch(() => {})
        user.ban()


           var embed24 = new Discord.MessageEmbed()
                .setTitle("Ban")
                .setDescription(`${user} è stato bannato per: ${motivo} \nStaffer: ${staffer}`)
                .setFooter(moment(new Date().getTime()).locale("it").format("ddd DD MMM, HH:mm:ss"))
                .setColor("#FF0000");

            client.channels.cache.get(db.guilds.get(`${interaction.guild.id}.log`)).send({ embeds: [embed24] })
            
    


        },
};