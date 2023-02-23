const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('iwon')
		.setDescription('Update the matchups with your win and get your next match'),
	async execute(interaction) {
        
        let working = interaction.client.playersToNodeMap.get(interaction.user.id);
        console.log(working);

        if(working){
            // break case user isnt in match
            if(working.incoming === interaction.user){
                return await interaction.reply(`You're still waiting for ${working.player1} and ${working.player2} match to finish`);
            }
            else if(working.player1 == null || working.player2 == null){
                return await interaction.reply(`You're still waiting for ${working.prev.player1} and ${working.prev.player2} match to finish`);
            }
            
            let matchString = working.getWinner(interaction.user);

            // if player 1 is the winner
            if(working.player1 === interaction.user){
                // if it is the tail node send the loser with normal message
                if(working === interaction.client.matchups.tail){
                    if(working.next.player1 != null && working.next.player2 != null){
                        working.next.incoming = working.player2;
                    }
                    else if(working.next.player1 == null){
                        working.next.player1 = working.player2;
                    }
                    else if(working.next.player2 == null){
                        working.next.player2 = working.player2;
                    }
                    else if(working.next.incoming != null){
                        matchString+= 'Seems like there\'s been a bit of a pile up, play an extra game until those ahead of you finish up';
                    }
                    interaction.client.playersToNodeMap.set(working.player2.id, working.next);
                    matchString += working.next.getMatch();

                    // the player staying behind is either waiting or plays the incomer
                    if(working.incoming){
                        working.player2 = working.incoming;
                        interaction.client.playersToNodeMap.set(working.incoming.id, working);
                        working.incoming = null;
                    }
                    else{
                        working.player2 = null;
                    }
                }
                // if its not the tail node send the winner
                else{
                    if(working.next.player1 != null && working.next.player2 != null){
                        working.next.incoming = working.player1;
                    }
                    else if(working.next.player1 == null){
                        working.next.player1 = working.player1;
                    }
                    else if(working.next.player2 == null){
                        working.next.player2 = working.player1;
                    }
                    else if(working.next.incoming != null){
                        matchString+= 'Seems like there\'s been a bit of a pile up, play an extra game until those ahead of you finish up';
                    }
                    interaction.client.playersToNodeMap.set(working.player1.id, working.next);

                    // if the next match is the tail winner plays the winner else they play the remaining loser
                    if(working.next === interaction.client.matchups.tail){
                        matchString += working.next.getTailsMatch();
                    }
                    else{
                        matchString += working.next.getMatch();
                    }

                    // the player staying behind is either waiting or plays the incomer
                    if(working.incoming){
                        working.player1 = working.incoming;
                        interaction.client.playersToNodeMap.set(working.incoming.id, working);
                        working.incoming = null;
                    }
                    else{
                        working.player1 = null;
                    }
                }
                
                // remaining player plays the winner unless its the head then plays the loser
                if(working.prev === interaction.client.matchups.tail){
                    matchString += working.getHeadMatch();
                }
                else{
                    matchString += working.getMatch();
                }
                
            }
            // player 2 is the winner
            else if(working.player2 === interaction.user){
                // if it is the tail node send the loser with normal message
                if(working === interaction.client.matchups.tail){
                    if(working.next.player1 != null && working.next.player2 != null){
                        working.next.incoming = working.player1;
                    }
                    else if(working.next.player1 == null){
                        working.next.player1 = working.player1;
                    }
                    else if(working.next.player2 == null){
                        working.next.player2 = working.player1;
                    }
                    else if(working.next.incoming != null){
                        matchString+= 'Seems like there\'s been a bit of a pile up, play an extra game until those ahead of you finish up';
                    }
                    interaction.client.playersToNodeMap.set(working.player1.id, working.next);
                    matchString += working.next.getMatch();

                    // the player staying behind is either waiting for plays the incomer
                    if(working.incoming){
                        working.player1 = working.incoming;
                        interaction.client.playersToNodeMap.set(working.incoming.id, working);
                        working.incoming = null;
                    }
                    else{
                        working.player1 = null;
                    }
                }
                // if its not the tail node send the winner
                else{
                    if(working.next.player1 != null && working.next.player2 != null){
                        working.next.incoming = working.player2;
                    }
                    else if(working.next.player1 == null){
                        working.next.player1 = working.player2;
                    }
                    else if(working.next.player2 == null){
                        working.next.player2 = working.player2;
                    }
                    else if(working.next.incoming != null){
                        matchString+= 'Seems like there\'s been a bit of a pile up, play an extra game until those ahead of you finish up';
                    }
                    interaction.client.playersToNodeMap.set(working.player2.id, working.next);

                    // if the next match is the tail the winner plays the winner else they play the remaining loser
                    if(working.next === interaction.client.matchups.tail){
                        matchString += working.next.getTailsMatch();
                    }
                    else{
                        matchString += working.next.getMatch();
                    }

                    // the player staying behind is either waiting for plays the incomer
                    if(working.incoming){
                        working.player2 = working.incoming;
                        interaction.client.playersToNodeMap.set(working.incoming.id, working);
                        working.incoming = null;
                    }
                    else{
                        working.player2 = null;
                    }
                }

                // remaining player plays the winner unless its the head then plays the loser
                if(working.prev === interaction.client.matchups.tail){
                    matchString += working.getHeadMatch();
                }
                else{
                    matchString += working.getMatch();
                }
            }

            await interaction.reply(matchString);
        }
        else{
            await interaction.reply('You are not currently in the session, enter /joinsession to join the session.');
        }
	},
};