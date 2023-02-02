const { Captcha } = require("captcha-canvas")
const captcha = new Captcha()
const MapDB = require('quickmap.db');
const db = require("quickmap.db")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return
        if (interaction.customId == "verificac") {
            captcha.async = true
            captcha.addDecoy()
            captcha.drawTrace()
            captcha.drawCaptcha()
            console.log(captcha.text)
            const captchaimage = new Discord.MessageAttachment(await captcha.png, "captcha.png")
            db.guilds = new MapDB('guilds.json');
            mainrole = db.guilds.get(`${interaction.guild.id}.settings.mainrole`)
            let cmsg = await interaction.user.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setTitle("Captcha Verification")
                        .setColor('BLUE')
                        .setImage(`attachment://captcha.png`)
                ],
                files: [captchaimage]
            })
            interaction.reply({ embeds: [
                new Discord.MessageEmbed()
                .setDescription("Ho inviato il link nei dm........ [controlla](https://discord.com/channels/@me/1062419392861847612)")
                .setColor('BLUE')
            ], ephemeral: true })

            const filter = (message) => {
                if (message.author.id !== interaction.user.id) return
                if (message.content === captcha.text) return true;
                else interaction.user.send("Capctha sbagliato")
            }
            try {
           const response =  await cmsg.channel.awaitMessages(
                {
                    filter,
                    max: 1,
                    time: 15000,
                    errors: ['time']
                })
                if(response){
                    interaction.user.send("Sei stato verificato con successo")
                   await interaction.member.roles.add(mainrole).catch(e => {})
                }
        } catch (err) {
            await interaction.user.send("Tempo finito, quindi ti ho kikkato")
            interaction.member.kick().catch((e) => {})
        }
    }
}
}