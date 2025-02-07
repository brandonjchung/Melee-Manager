const { SlashCommandBuilder } = require('discord.js');
const { LinkedList } = require('../objects/LinkedList.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('printmatchups')
        .setDescription('Displays current matchups'),
    async execute(interaction) {
        let matchString = 'Match Ups: \n';
        
        // create matchups should load all the players into the matchups linked list
        if(interaction.client.players != null && interaction.client.players.size > 1){
            
            let workingNode = interaction.client.matchups.head;
            
            do {
                console.log(workingNode);
                matchString += workingNode.getMatch();
                workingNode = workingNode.next;
            } while(workingNode != interaction.client.matchups.head)
    
            await interaction.reply(matchString);
        }
        else{
            await interaction.reply('There are currently no players in the session enter /joinsession to join the session.')
        }
    }
}