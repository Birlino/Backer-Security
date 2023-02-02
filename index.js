
const { founder } = require("./founder.json")
//Library include
global.Discord = require('discord.js')
global.client = new Discord.Client({
    intents: 32767
});

const dotenv = require('dotenv');
const fs = require("fs");
global.fs = require("fs");
global.humanNumber = require("human-number");
global.Parser = require('expr-eval').Parser;
global.moment = require("moment");
global.ms = require("ms");
global.ws = require("ws")
global.MongoClient = require('mongodb').MongoClient;


//Configs
global.log = require("./events/logs/log.json")
global.config = require("./config.json");
global.prefix = "!"


const MapDB = require('quickmap.db');
const db = require("mongoose")
db.users = new MapDB('users.json');
db.guilds = new MapDB('guilds.json');
db.credits = new MapDB('credits.json');
//library init
dotenv.config();


//COMMANDS
client.commands = new Discord.Collection();
fs.readdirSync('./commands/').forEach(dir => {
  const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${dir}/${file}`);
        client.commands.set(command.name, command);
    }
})
//EVENTS
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventsFiles) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args));
    }
}



client.on("interactionCreate", async (interaction, guild) => {
    if (!interaction.isCommand()) return;

      const command = interaction.commandName

    let comando = client.commands.get(command);


    if (!comando) 
    
    comando = client.commands.get(interaction.customId);
    if (!comando) return;
    const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
    const ms = require('ms');
    
    const earnCashCommandCooldown = new CommandCooldown('earnCash', ms(`${comando.cooldown}`)); 
    

  
        const userCooldowned = await earnCashCommandCooldown.getUser(interaction.user.id); 
        if(userCooldowned){
            const timeLeft = msToMinutes(userCooldowned.msLeft, false); 
            return interaction.reply({content: `Devi aspettare ${timeLeft.seconds + ' secondi'} prima di eseguire il comando!`, ephemeral: true});
        }else{
            // do your command stuff
            // and
            await earnCashCommandCooldown.addUser(interaction.user.id); // Cooldown user again
        }
    
    var stafferrole = db.guilds.get(`${interaction.guild.id}.settings.staffrole`)
    if (comando.onlyDev && !founder.some(id => id == interaction.user.id))  {
      interaction.reply({ content: `Non hai il permesso per usare \`${command}\` è solo per gli owner del bot`, ephemeral: true })
      return
  }
   else if (comando.onlyStaff && !interaction.member.roles.cache.has(stafferrole)) {
        interaction.reply({ content: `Non hai il permesso per usare \`${command}\` è un comando solo per gli staff`, ephemeral: true })
        return
    }
    else if (comando.onlyOwner && interaction.guild.ownerId !== interaction.user.id) {
      interaction.reply({ content: `Non hai il permesso per usare \`${command}\` è un comando solo per gli owner `, ephemeral: true })
      return
  }
    await comando.execute(interaction);}
)




client.on('ready', () => {
  const fs = require('fs');
  const {
    REST
  } = require('@discordjs/rest');
  const {
    Routes
  } = require('discord-api-types/v9');
  const {
    clientId
  } = require('./config.json');
  const t = require('./config.json');
  
  const commands = [];
  fs.readdirSync('./commands/').forEach(dir => {
    const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${dir}/${file}`);
    commands.push(command.data);
    
  
  }
})
  
  const rest = new REST({
    version: '9'
  }).setToken(t.token);
  
  rest.put(Routes.applicationCommands(clientId), {
      body: commands
    })
    .then(() => console.log('Comandi registrati con successo!'))
    .catch(console.error)

})

var url = "mongodb+srv://Birlino:Alessio.08.minerale@cluster0.s43klhx.mongodb.net/test"
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
database = db.db("Birlino")
  console.log('\x1b[32m%s\x1b[0m', "Connesso al database")})

  client.on('guildCreate', async (guild) => {

        const embed = new Discord.MessageEmbed()
            .setTitle('Sono stato aggiunto a un server')
            .setColor('GREEN')
            .setDescription('Ecco le informazioni del server')
            .addField('Server Name', '**' + guild.name + '**')
            .addField('Guild ID', '`' + guild.id + '`')
            .addField('Numero di membri', guild.members.cache.size + ' membri')
            .addField('Owner', '__' + client.users.cache.get(guild.ownerId).tag + '__')
           
        client.channels.cache.get(config.logsChannel).send({embeds: [embed]});
        client.user.setActivity(`/help || ${client.guilds.cache.size} ${client.guilds.cache.size > 1 ? 'Servers' : 'Server'}`, { type: 'WATCHING' });
        let owner = await guild.fetchOwner()
        owner.send({
          embeds: [
            new Discord.MessageEmbed()
            .setAuthor({name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}`})
            .setDescription(`Grazie **${owner}** per aver aggiungo ${client.user.username} al tuo server ${guild.name}.\n Le ricordiamo con con il comando `+ "``/setup``" +`verranno automaticamente creati i log, abilitata la verifica con **captcha**, il welcome e altre funzionalità.\n Per vedere tutti i comandi a disposizione faccia`+ "``/help``")
            .setColor('BLUE')
          ]

        })
    })
    client.on('guildDelete', async (guild) => {

            const embed = new Discord.MessageEmbed()
                .setTitle('Sono stato rimosso da un server')
                .setColor('RED')
                .setDescription('Ecco le informazioni del server')
                .addField('Server Name', '**' + guild.name + '**')
                .addField('Guild ID', '`' + guild.id + '`')
                .addField('Numero di membri', guild.members.cache.size + ' membri')
                .addField('Owner', '__' + client.users.cache.get(guild.ownerId).tag + '__')
               

            client.channels.cache.get(config.logsChannel).send({embeds: [embed]});
            client.user.setActivity(`/help || ${client.guilds.cache.size} ${client.guilds.cache.size > 1 ? 'Servers' : 'Server'}`, { type: 'WATCHING' })});
        
    client.on("messageCreate", async(message) => {
                if (message.content.startsWith(`${prefix}ticket`)) { 
                    message.delete()
                    if (!founder.includes(message.author.id)) {return}
                    var embed = new Discord.MessageEmbed()
                    .setTitle("<:BS_ticket:1016254498701840476> | Ticket Backer Security Support")
                    .setDescription("**AMMINISTRAZIONE** <a:BS_arrow:1016254886494609418> `Se vuoi contattare una setup` \n\n **SETUP** <a:BS_arrow:1016254886494609418> `Se non riesci a settare un bot o il nostro bot nel proprio server` \n\n **SUPPORTO** <a:BS_arrow:1016254886494609418> `Se vuoi ricevere supporto da uno staffer`")
                    .setFooter(`|| Powered by birlino#5778 `, client.user.displayAvatarURL())
                    .setImage("https://media.discordapp.net/attachments/927851318893244466/1026226017016217610/7B2F64DC-04FE-490A-B4B0-D58EA3651344.png")
                    .setColor('BLUE')
                    var setup = new Discord.MessageButton()
                    .setLabel("︲setup")
                    .setCustomId("setup")
                    .setStyle("PRIMARY")
                    .setEmoji("<:BS_setup:1016254059088445440>")
                    var setup = new Discord.MessageButton()
                    .setLabel("︲Setup")
                    .setCustomId("setup")
                    .setStyle("PRIMARY")
                    .setEmoji("<:BS_setup:1016253666820362251>")
                    var supporto = new Discord.MessageButton()
                    .setLabel("︲Supporto")
                    .setCustomId("supporto")
                    .setStyle("PRIMARY")
                    .setEmoji("<:BS_moderation:1016249615399526410>")
                    var row = new Discord.MessageActionRow()
                    .addComponents(setup)
                    .addComponents(setup)
                    .addComponents(supporto)
                    message.channel.send({embeds: [embed], components: [row]})}
                })


                client.on("messageCreate", message => {
                  if (message.channel.type == "DM") return
              
                  var parolacce = ["cazzo", "merda", "porco dio", "dio porco", "bastardo", "stronzo", "figlio di puttana", "dio cane", "troia", "mignotta", "madonna puttana", "puttana madonna", "pisello", "figa", "culo", "dick", "milf", "sborra", "sperma", "inculo", "inculare"]
                  var trovata = false;
                  var testo = message.content;
              
                  parolacce.forEach(parola => {
                      if (message.content.toLowerCase().includes(parola.toLowerCase())) {
                          trovata = true;
                          testo = parola;
                      }
                  })
              
                  if (trovata) {
                    var canale =  db.guilds.get(`${message.guild.id}.log`)
                    if(!canale) {return} 
                      message.delete();
                      var embed = new Discord.MessageEmbed()
                          .setTitle("Backer Security - Anti Swear")
                          .setDescription("❱ "+message.author.toString() + " il sistema di **Anti-BadWords** di **Backer Security** ha rilevato una parola non consentita nel server! \r\r❱ Il contenuto inviato in chat: **" + testo + "**\r\r> ```Il contenuto è stato rimosso. Se questa azione si ripeterà può comportare ad un Warn o ad un Provvedimento Altamente Grave!```")
                          .setColor("DARK_BLUE")
                      message.author.send({ embeds: [embed] }).catch(() => { })
                     client.channels.cache.get(canale).send({embeds: [embed]}) 
                  }
              })

             


client.login(config.token);

    
         