const MapDB = require('quickmap.db');
const db = require("quickmap.db")

module.exports = {
    name: "blacklistremove",
    onlyDev: true,
    tipo: "staff",
    description: "Rimuovi un utente alla blacklist generale",
    cooldown: "5s",
    data: {
        name: "blacklistremove",
        onlyDev: true,
        tipo: "staff",
        description: "Rimuovi un utente alla blacklist generale",
        cooldown: "5s",
        options: [{
            name: 'utente',
            description: "utente da rimuovere alla blacklist",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.USER,
        },
    {
        
            name: 'motivo',
            description: "motivo per la blacklist",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
        
    }],
    },
    async execute(interaction){
        db.black = new MapDB('blacklist.json');
        var utente = interaction.options.getUser("utente")
        var motivo = interaction.options.getString("motivo")

        db.black.delete(`${utente.id}.blacklist`)
        utente.send(`Sei stato rimosso dalla blacklist di Backer Security\nMotivo: ${motivo}`)
        interaction.reply({content: `${utente} rimosso dalla blacklist con successo`, ephemeral: true})
    }
}

