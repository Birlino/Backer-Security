const { WelcomeChannel } = require('discord.js');
const MapDB = require('quickmap.db');
const db = require("mongoose")
module.exports = {
    name: "setup",
    onlyOwner: true,
    onlyStaff: false,
    tipo: "general",
    description: "Esegui il setup del tuo server per il bot!",
    options: [
        {
            name: "welcome_channel",
            description: "Inserisci il canale per i messaggi di benvenuto!",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL,

        },
        {
            name: "verify_channel",
            description: "Inserisci il canale per la verifica!",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL,
        },
        {
            name: "staff_role",
            description: "Inserisci il ruolo dello staff del server!",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.ROLE,
        },
        {
            name: "main_role",
            description: "Inserisci il ruolo per far verificare i membri!",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.ROLE,
        },
        {
            name: "log",
            description: "Inserisci se vuoi ricevere i log!",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            choices: [
                {
                    name: "Si",
                    value: "si",
                },  
                {
                    name: "No",
                    value: "no",
                }
            ]
        },
        {
            name: "captcha",
            description: "scegli se vuoi fare la verifica tramite captcha!",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            choices: [
                {
                    name: "Si",
                    value: "si",
                },  
                {
                    name: "No",
                    value: "no",
                }
            ]
        }],
        data: {
            name: "setup",
            onlyOwner: true,
            onlyStaff: false,
            tipo: "general",
            description: "Esegui il setup del tuo server per il bot!",
            options: [
                {
                    name: "welcome_channel",
                    description: "Inserisci il canale per i messaggi di benvenuto!",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL,
        
                },
                {
                    name: "verify_channel",
                    description: "Inserisci il canale per la verifica!",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL,
                },
                {
                    name: "staff_role",
                    description: "Inserisci il ruolo dello staff del server!",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.ROLE,
                },
                {
                    name: "main_role",
                    description: "Inserisci il ruolo per far verificare i membri!",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.ROLE,
                },
            ],
        },
    async execute(interaction, guild) {
        db.guilds = new MapDB('guilds.json');
        if(db.guilds.get(`${interaction.guild.id}.servername.${interaction.guild.name}`)){
            return interaction.reply({content: "Hai già eseguito il setup del server se vuoi cambiare impostazioni fai ``/delete-server`` e poi rifai ``/setup``", ephemeral: true})
        }
        //DataBase ||


        //Impostazione variabili "const" || 
        const canaleWelcome = interaction.options.getChannel('welcome_channel');
        const canaleVerifica = interaction.options.getChannel('verify_channel');
        const staffRuolo = interaction.options.getRole('staff_role');
        const mainRuolo = interaction.options.getRole('main_role')
        const owner = interaction.guild.ownerId;
        const log = interaction.options.getString("log");
        var si = []

        //Settaggio informazioni ||
        if(interaction.options.getChannel("welcome_channel")) {
            await db.guilds.set(`${interaction.guild.id}.servername.${interaction.guild.name}`, si)
        await db.guilds.get(`${interaction.guild.id}.settings.welcomechannel`, canaleWelcome.id) 
        }
        if(interaction.options.getChannel("verify_channel")) {
             await db.guilds.set(`${interaction.guild.id}.settings.verifychannel`, canaleVerifica.id)
   

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
            client.channels.cache.get(db.guilds.get(`${interaction.guild.id}.settings.verifychannel`)).send({ embeds: [embed], components: [row] })
            };
           
            
        if(interaction.options.getRole("staff_role")) {
            await db.guilds.set(`${interaction.guild.id}.settings.staffrole`, staffRuolo.id) 
        }
        if(interaction.options.getRole("main_role")) {
            await db.guilds.set(`${interaction.guild.id}.settings.mainrole`, mainRuolo.id) 
        }
        
        var server = interaction.member.guild;
        let setupserver = new Discord.MessageEmbed()
        .setAuthor({name: `${interaction.user.tag} `, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setDescription("Ha configurato il suo server")
        .addField("Nome server", `${interaction.guild.name}`, true)
        .addField("Owner", "__"+ client.users.cache.get(server.ownerId).tag + "__")
        .addField("Server id", server.id, true)
        .addField("Members", server.memberCount.toString())
        .addField("Channels", server.channels.cache.size.toString())
        .addField("Server created", server.createdAt.toDateString())
        .addField("Boost level", "Level " + (server.premiumTier != "NONE" ? server.premiumTier : 0) + " (Boost: " + server.premiumSubscriptionCount + ")", true)
        .setThumbnail(server.iconURL())
        .setColor("#0040FF")
        client.channels.cache.get("1016363987224494130").send({embeds: [setupserver]})

        let settaggiocorretto = new Discord.MessageEmbed()
        .setTitle("Configurazione impostata")
        .setDescription("Hai configurato **correttamente** il tuo server! ")
        .setColor("GREEN")
        
        interaction.reply({ embeds: [settaggiocorretto], ephemeral: true })
          if(db.guilds.get(`${interaction.guild.id}.log`)){
                return
            }
            const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
        var chanlog = await interaction.guild.channels.create(`log-${client.user.username}`,{
            type: "GUILD_TEXT",
            topic: "Log per backer security",
            permissionOverwrites: [
                {
                    id: db.guilds.get(`${interaction.guild.id}.settings.staffrole`),
                    allow: ["VIEW_CHANNEL"]
                },
                {
                    id: everyone.id,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                }
            ]
        })
        db.guilds.set(`${interaction.guild.id}.log`, chanlog.id)
        
    }

}
