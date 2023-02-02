

module.exports = {
    name: 'messageCreate',
   async execute(message)  {
    if(message.content.startsWith(`${prefix}status`)) {
    var os = require('os');
    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
    var  getpercentage = 
    ((usedMemory/totalMemory) * 100).toFixed(2) + '%'
    const statusEmbed = new Discord.MessageEmbed()
          .setColor("#0040FF")
          .setFooter(`${client.user.username}`)
          .setTitle(`Bot Status`)
          .addField('🛠️Status: ' + client.user.presence.status, '⠀', true)
          .addField('🏓Ping: ' + client.ws.ping + 'ms', '⠀', true)
          .addField('⚙️D.js version: v' + require('discord.js').version, '⠀', true)
          .addField('🍜Used ram: ' + getpercentage,'⠀', true)
          .addField('💻Joined servers: ' + client.guilds.cache.size, '⠀', true)
          .addField('🙍Creators: birlino#0001', '⠀', true)
          message.channel.send({ embeds: [statusEmbed] })

          //
      
        /*message.channel.clone().then(channel => {
           
            channel.send('nuked')
        })
        message.channel.delete()
        }*/
  }}
}
