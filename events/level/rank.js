const Levels = require("discord-xp")

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if(message.content.startsWith(`${prefix}rank`)){
            const canvacord = require('canvacord');
            Levels.setURL("mongodb+srv://Birlino:Alessio.08.minerale@cluster0.s43klhx.mongodb.net/test");
            const target = message.mentions.users.first() || message.author; // Grab the target.

            const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.
            
            const rank = new canvacord.Rank() // Build the Rank Card
                .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
                .setCurrentXP(user.cleanXp) // Current User Xp for the current level
                .setRequiredXP(user.cleanNextLevelXp) //The required Xp for the next level
                .setRank(user.position) // Position of the user on the leaderboard
                .setLevel(user.level) // Current Level of the user
                .setProgressBar("#FFFFFF")
                .setUsername(target.username)
                .setDiscriminator(target.discriminator);
        
            rank.build()
                .then(rank => {
                const attachment = new Discord.MessageAttachment(rank, "RankCard.png");
                message.channel.send({files: [attachment]});
            });
        

    }}}