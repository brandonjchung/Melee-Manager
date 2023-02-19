const { SlashCommandBuilder } = require('discord.js');
const { LinkedList } = require('../objects/LinkedList.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('creatematchups')
        .setDescription('Creates player matchups'),
    async execute(interaction) {
        let matchString = 'Match Ups: \n';
        
        // create matchups should load all the players into the matchups linked list
        interaction.client.matchups = new LinkedList();
        for(let player of interaction.client.players){
            interaction.client.matchups.add(player, interaction.client.playersToNodeMap);
        }
        
        let workingNode = interaction.client.matchups.head;
        
        do {
            matchString += workingNode.getMatch();
            workingNode = workingNode.next;
        } while(workingNode != head)

        await interaction.reply(matchString);
    }
}