const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joinsession')
		.setDescription('Join Smash Friendlies Rotation'),
	async execute(interaction) {

        // check if player already exists 
        if(!interaction.client.players.get(interaction.user.id)){
            let appendString = '';
            
            // check if matches are already ongoing if so add player to rotation as well
            if(interaction.client.matchups != null){
                interaction.client.matchups.add(user, interaction.client.playersToNodeMap);
                appendString = interaction.client.playersToNodeMap(user.id).getMatch();
            }
            
            interaction.client.players.set(interaction.user.id, interaction.user);
            await interaction.reply(`A new challenger ${interaction.user}, approaches. ${appendString}`);
        }
        else{
            await interaction.reply(`${interaction.user}, you are already in the session`);
        }
	},
};