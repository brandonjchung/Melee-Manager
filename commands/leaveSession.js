const { SlashCommandBuilder } = require('discord.js');
const { helper } = require('../util/helper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leavesession')
		.setDescription('Leaves Smash Friendlies Rotation'),
	async execute(interaction) {

        // check if player exists in the session
        if(interaction.client.players.get(interaction.user.id)){
            
            let matchString = '';
            let working;
            

            // check if matches have already started and remove from match node
            if(interaction.client.matchups != null && interaction.client.playersToNodeMap.get(interaction.user.id) != null){
                working = interaction.client.playersToNodeMap.get(interaction.user.id);
                
                // edge case for removing head/tail they still point to that node
                if(working == interaction.client.matchups.head){
                    interaction.client.matchups.head = interaction.client.matchups.head.next;
                }
                if(working == interaction.client.matchups.tail){
                    interaction.client.matchups.tail = interaction.client.matchups.tail.prev;
                }

                // if only player in match node remove the entire node
                if((working.player1 == interaction.user && working.player2 == null) || 
                    (working.player2 == interaction.user && working.player1 == null)){
                    working.next.prev = working.prev;
                    working.prev.next = working.next;
                }
                // should do a move up check and also cleanup list afterwards
                else if(working.player1 == interaction.user){
                    working.player1 = null;
                    helper.cleanupList(interaction.client.matchups);
                    matchString += working.getMatch();
                }
                else if(working.player2 == interaction.user){
                    working.player2 = null;
                    helper.cleanupList(interaction.client.matchups);
                    matchString += working.getMatch();
                }
                interaction.client.playersToNodeMap.delete(interaction.user.id);
            }

            interaction.client.players.delete(interaction.user.id);
            await interaction.reply(`${interaction.user}, flees from the battlefield \n${matchString}`);
        }
        else{
            await interaction.reply(`${interaction.user.username} is not in the current session, Enter /joinsession to join`);
        }
	},
};