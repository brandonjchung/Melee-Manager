const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Allows you to remove someone from the session in case they forget to leave'),
	async execute(interaction) {

        // lookup the slash command extra options to insert username
        if(interaction.client.players.get(interaction.user.id)){
            // need to update the node it came from if current session 
            if(interaction.client.matchups != null && interaction.client.playerToNodeMap.get(interaction.user.id) != null){
                let working = interaction.client.playerToNodeMap.get(interaction.user.id);
            }
            
            interaction.client.players.delete(interaction.user.id);
            await interaction.reply(`${interaction.user.username}, flees from the battlefield`);
        }
        else{
            await interaction.reply(`${interaction.user.username} is not in the current session, Enter /joinsession to join`);
        }
	},
};