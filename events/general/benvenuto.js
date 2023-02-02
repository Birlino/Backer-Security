
const MapDB = require('quickmap.db');
const db = require("quickmap.db")
module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        db.black = new MapDB('blacklist.json');
        let owner = await member.guild.fetchOwner()
        if(db.black.get(`${member.user.id}.blacklist`)){
            owner.send({embeds: [
                new Discord.MessageEmbed()
            .setDescription(`Un utente blacklistato più volte per raid/nuke è entrato nel tuo server\nFai attenzione!!!!\nID: ${member.id}\nTAG: ${member.user.tag}\nUSERNAME: ${member.user.username}`)
                .setColor('RED')]
            }
        )
    }
        



    db.guilds = new MapDB('guilds.json');
    var canale = db.guilds.get(`${member.guild.id}.settings.welcomechannel`)
    if(!canale) return

        let utentiCount = member.guild.memberCount        
        let avatar = member.user.displayAvatarURL()
        var embed = new Discord.MessageEmbed()
        .setAuthor({name: `${member.user.tag} `, iconURL: `${member.user.displayAvatarURL()}`})
        .setDescription(`Benvenuto in ${member.guild.name}`)
        .setColor('RANDOM') 
        .setThumbnail(avatar)
        .setTimestamp(moment(new Date().getTime()).format("ddd DD MMM, HH:mm:ss"))
        .setFooter({text: `${client.user.tag} || ${utentiCount} membri`, iconURL: client.user.displayAvatarURL()})
        //client.channels.cache.get
        member.guild.channels.cache.get(canale).send({ embeds: [embed], content: `Ciao ${member.toString()}`})
            }
                
        }
    //member.roles.add("937111618339352626"); 
       

