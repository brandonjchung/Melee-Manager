const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leavesession')
		.setDescription('Leaves Smash Friendlies Rotation'),
	async execute(interaction) {

        // check if player exists in the session
        if(interaction.client.players.get(interaction.user.id)){
            // need to update the node it came from if current session 
            // also needs a cleanup functionality say for example
            // a -> b -> c -> d -> e
            // 1    2    2    1    2
            // two people are doing nothing
            // a -> b -> c -> d
            // 2    0    2    1
            // cleanup empty node

            // check if matches have already started
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