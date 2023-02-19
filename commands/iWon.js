const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('iwon')
		.setDescription('Update the matchups with your win and get your next match'),
	async execute(interaction) {
        // use cases /iwon
            // curr node is a p1 and p2 but no incomer
            // - next node has p1 and p2
                // - 
            // - next node only has p1 or p2
            // - next node has an incomer
            // curr node is a p1 and p2 and an incomer
            // - next node has p1 and p2
            // - next node only has p1 or p2
            // - next node has an incomer

        // if there are two in that current node set the other player to next incoming
        // needs to be able to handle the next match finishes or the one before finishes first
        // match a > match b > match c
        // say match b is currently waiting and is set as incomer for match c
        // if match a finishes first remove match b as incomer
            // if match c finishes first

	},
};