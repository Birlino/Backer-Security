

const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        if(!interaction.isButton()) {return}
        
        else {
            if (interaction.customId == "supporto") {
                if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
                    return interaction.reply({
                      content: 'Hai già un ticket aperto!',
                      ephemeral: true
                    });
                  };
                const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
                var user = interaction.user
                interaction.guild.channels.create(`ticket-${user.username}`,{
                    type: "GUILD_TEXT",
                    parent: "1061654217372209172",
                    topic: interaction.user.id,
                    permissionOverwrites: [
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: config.staff,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: everyone.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ]
                }).then(async c => {
                    interaction.reply({
                      content: `Ticket created! <#${c.id}>`,
                      ephemeral: true
                    });
                    
                const embed = new Discord.MessageEmbed()
                .setColor('6d6ee8')
                .setAuthor({name: `${interaction.user.username}'s Ticket`, iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
                .setDescription('Ticket aperto per **SUPPORTO** uno staffer sarà da te a momenti perfavore attendi!')
                .setFooter({text: `${client.user.tag} || `, iconURL: client.user.displayAvatarURL()}) //Testo sotto opzionale
                .setTimestamp("Ricorda Apri un Ticket solo in caso di bisogno");

                const row = new Discord.MessageActionRow()
                .addComponents(
                  new Discord.MessageButton()
                  .setCustomId('close-ticket-supporto')
                  .setLabel('close')
                  .setEmoji('✖') //Emoji del close
                  .setStyle('DANGER'))

                const opened = await c.send({
                    content: `<@&${config.staff}>`,
                    embeds: [embed],
                    components: [row]
                  });
  
                  opened.pin().then(() => {
                    opened.channel.bulkDelete(1);
                  });
                })}}
            
            if (interaction.customId == "close-ticket-supporto") {
            if(!interaction.member.roles.cache.has(config.staff)){
              return interaction.reply({content: `Non hai il ruolo `+ "<@&"+(config.staff)+">", ephemeral: true })
            }
                const guild = client.guilds.cache.get(interaction.guildId);
                const chan = guild.channels.cache.get(interaction.channelId);
          
                const row = new Discord.MessageActionRow()
                  .addComponents(
                    new Discord.MessageButton()
                    .setCustomId('confirm-close-supporto')
                    .setLabel('Close')
                    .setStyle('DANGER'),
                    new Discord.MessageButton()
                    .setCustomId('no-supporto')
                    .setLabel('Cancel')
                    .setStyle('SECONDARY'),
                  );
          
                const verif = await interaction.reply({
                  content: 'Confermi di voler chiudere il ticket?',
                  components: [row]
                });
          
                const collector = interaction.channel.createMessageComponentCollector({
                  componentType: 'BUTTON',
                  time: 10000
                });
          
                collector.on('collect', i => {
                  if (i.customId == 'confirm-close-supporto') {
                    interaction.editReply({
                      content: `Ticket chiuso da <@!${interaction.user.id}>`,
                      components: []
                    });
          
                    chan.edit({
                        name: `closed-${chan.name}`,
                        parent: "1061654261785690173",
                        permissionOverwrites: [
                          {
                            id: client.users.cache.get(chan.topic),
                            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                          },
                          {
                            id: config.staff,
                            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                          },
                          {
                            id: interaction.guild.roles.everyone,
                            deny: ['VIEW_CHANNEL'],
                          },
                        ],
                      })
                      .then(async () => {
                        const embed = new Discord.MessageEmbed()
                          .setColor('6d6ee8')
                          .setAuthor({name: 'Ticket', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
                          .setDescription('```Ticket Riepilogo```')
                          .setFooter({text: `${client.user.tag} || `, iconURL: client.user.displayAvatarURL()})
                          .setTimestamp();
          
                        const row = new Discord.MessageActionRow()
                          .addComponents(
                            new Discord.MessageButton()
                            .setCustomId('delete-ticket-supporto')
                            .setLabel('Delete')
                            .setEmoji('🗑️') //Emoji del ticket eliminato
                            .setStyle('DANGER'),
                          );
                        chan.send({
                          embeds: [embed],
                          components: [row]
                        });
                      });
          
                    collector.stop();
                  };
                  if (i.customId == 'no-supporto') {
                    interaction.editReply({
                      content: 'Chiusura del ticket cancellata!',
                      components: []
                    });
                    collector.stop();
                  };
                });
          
                collector.on('end', (i) => {
                  if (i.size < 1) {
                    interaction.editReply({
                      content: 'Chiusura del ticket!',
                      components: []
                    });
                  };
                });
              };
          
              if (interaction.customId == "delete-ticket-supporto") {
                const guild = client.guilds.cache.get(interaction.guildId);
                const chan = guild.channels.cache.get(interaction.channelId);
                interaction.reply({
                  content: 'Salvataggio dei messaggio...'
                });
        
          
               const embed = new Discord.MessageEmbed()
               .setAuthor({name: 'Ticket Logs', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
               .setDescription(`📰 Log per ticket \`${chan.id}\` | creto da <@${chan.topic}> | chiuso da <@${interaction.user.id}>`)
               .setColor('2f3136')
               .setFooter({text: "Questo log sarà elliminato in 24h"})
               .setTimestamp()
               const discordTranscripts = require('discord-html-transcripts');
             
               
               
           
               const attachment = await discordTranscripts.createTranscript(chan,{
                 limit: +1,
                 returnType: 'attachment',
                 filename: 'transcript-admin.html', 
                 saveImages: true, 
               });
               

         
                     client.channels.cache.get("1061654596860256396").send({
                       files: [attachment],
                       embeds: [embed]
                     })
                     chan.send('Elliminazzione del ticket...');
         
                     setTimeout(() => {
                       chan.delete();
                     }, 5000);
                   };
             }
           }
