const Levels = require("discord-xp")

module.exports = {
    name :"messageCreate",
    async execute(message) {
        if (!message.guild) return;
        if (message.author.bot) return;
        Levels.setURL("mongodb+srv://Birlino:Alessio.08.minerale@cluster0.s43klhx.mongodb.net/test");
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
          const user = await Levels.fetch(message.author.id, message.guild.id);
          message.channel.send({ content: `${message.author}, cpngratulazionu! Ora sei al livello **${user.level}** continua così. :tada:` });
    }
}}