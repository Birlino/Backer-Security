const { Message } = require("discord.js");

module.exports = {
    name: "help",
    onlyStaff: false,
    tipo: "general",
    description: "Mostra la lista dei comandi",
    cooldown: "5s",
    data: {
        name: "help",
    onlyStaff: false,
    tipo: "general",
    description: "Mostra la lista dei comandi",
    },
    async execute(interaction) {
        let totalPage = 5;
        let page = 1;


        let page1 = new Discord.MessageEmbed()
            .setTitle("Comandi del server")
            .setDescription("Tutti i comandi specifici del server o del canale (:shield: = onlystaff) (👨‍💼 = onlydev)")
            .setColor("#2C5B7F")
            .setFooter("Page 1/" + totalPage)

        let page2 = new Discord.MessageEmbed()
            .setTitle("Fun")
            .setDescription("Tutti i comandi divertenti (:shield: = onlystaff) (👨‍💼 = onlydev)")
            .setColor("#CF394F")
            .setFooter("Page 2/" + totalPage)

        let page3 = new Discord.MessageEmbed()
            .setTitle("Music")
            .setDescription("Tutti i comandi per la musica (:shield: = onlystaff) (👨‍💼 = onlydev)")
            .setColor("#00B8A5")
            .setFooter("Page 3/" + totalPage)

        let page4 = new Discord.MessageEmbed()
            .setTitle("Staff")
            .setDescription("Tutti i comandi per lo staff (:shield: = onlystaff) (👨‍💼 = onlydev)")
            .setColor("#8F4A33")
            .setFooter("Page 4/" + totalPage)

         let page5 = new Discord.MessageEmbed()
            .setTitle("Moderazione")
            .setDescription("Tutti i comandi per la moderazione (:shield: = onlystaff) (👨‍💼 = onlydev)")
            .setColor("#8FA6BB")
            .setFooter("Page 5/" + totalPage)

        client.commands.forEach(command => {
            if (command.tipo == "general") {
                page1.addField(`${command.name} ${command.onlyStaff || command.onlyOwner ? ":shield:" : "" } ${command.onlyDev ? "👨‍💼" : ""}` , command.description, true)
            }
            if (command.tipo == "fun") {
                page2.addField(`${command.name} ${command.onlyStaff || command.onlyOwner ? ":shield:" : "" } ${command.onlyDev ? "👨‍💼" : ""}` , command.description, true)
            }
            if (command.tipo == "music") {
                page3.addField(`${command.name} ${command.onlyStaff || command.onlyOwner ? ":shield:" : "" } ${command.onlyDev ? "👨‍💼" : ""}` , command.description, true)
            }
            if (command.tipo == "staff") {
                page4.addField(`${command.name} ${command.onlyStaff || command.onlyOwner ? ":shield:" : "" } ${command.onlyDev ? "👨‍💼" : ""}` , command.description, true)
            }
            if (command.tipo == "moderation") {
                page5.addField(`${command.name} ${command.onlyStaff || command.onlyOwner ? ":shield:" : "" } ${command.onlyDev ? "👨‍💼" : ""}` , command.description, true)
            }

        })

        let button1 = new Discord.MessageButton()
            .setLabel("Indietro")
            .setStyle("PRIMARY")
            .setCustomId("indietro")

        let button2 = new Discord.MessageButton()
            .setLabel("Avanti")
            .setStyle("PRIMARY")
            .setCustomId("avanti")

        if (page == 1) button1.setDisabled()
        if (page == totalPage) button2.setDisabled()

        let row = new Discord.MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
            msg = await interaction.channel.send({
                embeds: [eval("page" + page.toString())],
                components: [row]
              });
       
            const collector = msg.createMessageComponentCollector()

            collector.on("collect", i => {
                if (i.user.id != interaction.user.id) return i.reply({ content: "Questo bottone non è tuo", ephemeral: true })

                i.deferUpdate()
                if (i.customId == "indietro") {
                    page--
                    if (page < 1) page = 1
                }
                if (i.customId == "avanti") {
                    page++
                    if (page > totalPage) page = totalPage
                }

                let button1 = new Discord.MessageButton()
                    .setLabel("Indietro")
                    .setStyle("PRIMARY")
                    .setCustomId("indietro")

                let button2 = new Discord.MessageButton()
                    .setLabel("Avanti")
                    .setStyle("PRIMARY")
                    .setCustomId("avanti")

                if (page == 1) button1.setDisabled()
                if (page == totalPage) button2.setDisabled()

                let row = new Discord.MessageActionRow()
                    .addComponents(button1)
                    .addComponents(button2)

                msg.edit({ embeds: [eval("page" + page.toString())], components: [row] })


            
            })
        }

    }
