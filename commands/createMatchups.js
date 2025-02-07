const { SlashCommandBuilder } = require('discord.js');
const LinkedList = require('../objects/LinkedList.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('creatematchups')
        .setDescription('Creates player matchups'),
    async execute(interaction) {
        let matchString = 'Match Ups: \n';
        
        // create matchups should load all the players into the matchups linked list
        if(interaction.client.players != null && interaction.client.players.size > 1){
            interaction.client.matchups = new LinkedList();
            

            for(let player of interaction.client.players.values()){
                interaction.client.matchups.add(player, interaction.client.playersToNodeMap);
            }
            
            let workingNode = interaction.client.matchups.head;
            
            do {
                matchString += workingNode.getMatch();
                workingNode = workingNode.next;
            } while(workingNode != interaction.client.matchups.head)
    
            await interaction.reply(matchString);
        }
        else{
            await interaction.reply('There are not enough players in the session enter /joinsession to join the session.')
        }
    }
}