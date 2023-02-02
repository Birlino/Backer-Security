const MapDB = require('quickmap.db');
const db = require("quickmap.db")

module.exports = {
    name: "blacklistadd",
    onlyDev: true,
    tipo: "staff",
    description: "Aggiungi un utente alla blacklist generale",
    cooldown: "5s",
    data: {
        name: "blacklistadd",
        onlyDev: true,
        tipo: "staff",
        description: "Aggiungi un utente alla blacklist generale",
        cooldown: "5s",
        options: [{
            name: 'utente',
            description: "utente da aggiungere alla blacklist",
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

        db.black.set(`${utente.id}.blacklist`, motivo)
        utente.send(`Sei stato aggiunto alla blacklist di Backer Security\nMotivo: ${motivo}`)
        interaction.reply({content: `${utente} aggiunto alla blacklist con successo`, ephemeral: true})
    }
}

