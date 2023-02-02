const MapDB = require('quickmap.db');
const db = require("mongoose")
global.ms = require("ms");
module.exports= {
    name: "giveway",
    description: "Fai un giveway per i membri",
    onlyStaff: true,
    options: [
        {
            name: "canale",
            description: "Metti il canale dove far iniziare il giveway",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name: "durata",
            description: "Inserisci la durata del giveway",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER

        }
    ],
    data: {
        name: "giveway",
        description: "Fai un giveway per i membri",
        onlyStaff: true,
        options: [
            {
                name: "canale",
                description: "Metti il canale dove far iniziare il giveway",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
            },
            {
                name: "durata",
                description: "Inserisci la durata del giveway es: d (days), h (hours), m (minutes), s (seconds)",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: "vincitori",
                description: "Inserisci il numero dei vincitori",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: "premio",
                description: "Inserisci il premio che si vince",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    },
    async execute(interaction) {
//variabili
var canale = interaction.options.getChannel("canale")
var durata = interaction.options.getString("durata")
var vincitori = interaction.options.getNumber("vincitori")
var premio = interaction.options.getString("premio")
        let startGiveawayEmbed = new Discord.MessageEmbed()
        .setTitle("🎉 GIVEAWAY 🎉")
        .setDescription(`${premio}\n\nReagisci con 🎉 per partecipare al Giveaway!\nWinners: **${vincitori}**\nTime Rimanente: **${durata}**\nHosted By: **${interaction.user.tag}**`)
        .setColor('#FFFFFF')
        .setTimestamp(Date.now() + ms(durata)) 
        .setFooter("Giveaway ends"); 

    let embedGiveawayHandle = await canale.send({embeds: [startGiveawayEmbed]})
    embedGiveawayHandle.react("🎉").catch(console.error); 
interaction.reply({content: `Giveway inviato con successo in ${canale}`, ephemeral: true})
    setTimeout(() => {
        if (embedGiveawayHandle.reactions.cache.get("🎉").count <= 1) {
            return canale.send("Nessuno si è unito al Giveaway :(")
        }
        if (embedGiveawayHandle.reactions.cache.get("🎉").count <= vincitori) { 
            return canale.send("Non ci sono abbastanza persone nel Giveaway per soddisfare il numero dei vincitori!")
        }

        var winner = embedGiveawayHandle.reactions.cache.get("🎉").users.cache.filter((users) => !users.bot).random(vincitori); 

        const endedEmbedGiveaway = new Discord.MessageEmbed()
        .setTitle("🎉 GIVEAWAY 🎉")
        .setDescription(`${premio}\n\nWinner(s): ${winner}\nHosted By: **${interaction.user.tag}**\nWinners: **${vincitori}**\nParticipants: **${embedGiveawayHandle.reactions.cache.get("🎉").count - 1}**\nDuration: **${durata}**`)
        .setColor('#FFFFFF')
        .setTimestamp(Date.now() + ms(durata)) 
        .setFooter({text: "Giveaway ended"}); 

        embedGiveawayHandle.edit({embeds:[endedEmbedGiveaway]}); 

        const congratsEmbedGiveaway = new Discord.MessageEmbed()
        .setDescription(`🥳 Congratulazioni ${winner}! Hai vinto **${premio}**!`)
        .setColor('#FFFFFF')


        
        
        
        canale.send({embeds: [congratsEmbedGiveaway]}).catch(console.error); 
    }, ms(durata));
    }
}