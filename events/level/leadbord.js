
const Levels = require("discord-xp")

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if(message.content.startsWith(`${prefix}leadboard`)) {
        Levels.setURL("mongodb+srv://Birlino:Alessio.08.minerale@cluster0.s43klhx.mongodb.net/test");
        if (!message.guild) return;
        if (message.author.bot) return;
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
        
        if (rawLeaderboard.length < 1) return reply("Non c'è nessun utente in leadboard.");
        
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
        
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.
        var embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name, "Leadboard")
        .setDescription("I top 10 utenti del server")
        .addFields({name: "Leadboard", value: lb.join('\n\n') || 'Nessun utente'})
        .setColor('GREEN')
        message.channel.send({embeds: [embed]});
        }
            }
        }
    
