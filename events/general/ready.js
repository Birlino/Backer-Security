

	module.exports = {
        name: 'ready',
        async execute() {
			client.user.setActivity(`/help || ${client.guilds.cache.size} ${client.guilds.cache.size > 1 ? 'Servers' : 'Server'}`, { type: 'WATCHING' });
			
			console.log('\x1b[33m','Bot started');
	
		}
        }
    
