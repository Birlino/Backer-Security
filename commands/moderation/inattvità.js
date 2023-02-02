

const MapDB = require('quickmap.db');
const db = require("mongoose")

module.exports = {
    name: "pausa-staff",
    description: "Richiedi una pausa staff",
    onlyStaff: true,
    cooldown:"5s",
    data:{
        name: "pausa-staff",
        description: "Richiedi una pausa staff",
        onlyStaff: true,
        cooldown:"5s",
        options: [
            {
            name: "tempo",
            description: "inserisci il tempo della pausa",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: "motivo",
                description: "inserisci il motivo della pausa",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
                }
    ]
    },
    async execute(Interaction) {
        var staffer = Interaction.member
        var staffer1 = Interaction.user
        var tempo = Interaction.options.getString("tempo")
        var motivo = Interaction.options.getString("motivo")
        var imagine = Interaction.user.displayAvatarURL()

        var embed = new Discord.MessageEmbed()
        .setAuthor({name: `${Interaction.user.tag}`, iconURL: `${Interaction.user.displayAvatarURL()}`})
        .setTitle("🎡 **inattività**")
        .setDescription("**Staffer**\n" + staffer.toString() + "\n\n **Tempo**\n" + tempo + "\n\n**Motivo**\n" + motivo)
        .setTimestamp() 
        .setThumbnail(imagine)
        .setColor('BLUE')

       const si = new Discord.MessageButton()
       .setCustomId('si')
       .setLabel('Accetta')
       .setStyle('PRIMARY')

       const no =   new Discord.MessageButton()
       .setCustomId('no')
       .setLabel('Rifiuta')
       .setStyle('PRIMARY')
        const row = new Discord.MessageActionRow()
			.addComponents(si)
            .addComponents(no)
                    var embedinactivity = await client.channels.cache.get("1066664164497567744").send({ embeds: [embed],
                        components: [row]})
                    
                        Interaction.reply({content: `Inattività inviata con successo`, ephemeral: true})





                        client.on('interactionCreate', async (Interaction)=> {
                            if(!Interaction.isButton) return
                            if(Interaction.customId == "si"){
                               var embed1 = new Discord.MessageEmbed() 
                                .setAuthor({name: `${staffer1.tag}`, iconURL: `${staffer.displayAvatarURL()}`})
                                .setTitle("🎡 **inattività**")
                               .setDescription("**Staffer**\n" + staffer.toString() + "\n\n **Tempo**\n" + tempo + "\n\n**Motivo**\n" + motivo)
                                .setTimestamp() 
                               .setThumbnail(staffer.displayAvatarURL())
                                .setColor('GREEN')
                                .setFooter({text: `Accettata da ${Interaction.user.tag}`})
                               
                                staffer.roles.add("1015953514280796212")
                              Interaction.reply({content: `Pausa Staff accettata con successo`, ephemeral: true})
                              no.setDisabled()
                              si.setDisabled()
                             embedinactivity.edit({embeds: [embed1], components:[row]})
                             

                             
                            }
                        })
                        
                        client.on('interactionCreate', async (Interaction)=> {
                            if(!Interaction.isButton) return
                            if(Interaction.customId == "no"){
                               var embed12 = new Discord.MessageEmbed() 
                                .setAuthor({name: `${staffer1.tag}`, iconURL: `${staffer.displayAvatarURL()}`})
                                .setTitle("🎡 **inattività**")
                               .setDescription("**Staffer**\n" + staffer.toString() + "\n\n **Tempo**\n" + tempo + "\n\n**Motivo**\n" + motivo)
                                .setTimestamp() 
                               .setThumbnail(staffer.displayAvatarURL())
                                .setColor('RED')
                                .setFooter({text: `Rifiutata da ${Interaction.user.tag}`})
                                Interaction.reply({content: `Pausa Staff rifiutata con successo`, ephemeral: true})
                                no.setDisabled()
                               si.setDisabled()
                                embedinactivity.edit({embeds: [embed12],  components:[row]})
                                
                            }
                        })

                           
                            
                       
    }
}

