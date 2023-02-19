module.exports = (user) => {
    this.player1 = user;
    this.player2 = null;
    this.incomer = null;
    this.next = null;
    
    this.getMatch = function(){
        if(player1 == null){
            next.incomer = player1;
            return `${player1.username} is waiting for ${this.next.player1} and ${this.next.player2}'s match to finish'`;
        }
        else if(player2 == null){
            next.incomer = player2;
            return `${player2.username} is waiting for ${this.next.player1} and ${this.next.player2}'s match to finish'`;
        }
        else{
            return `${player1.username} vs. ${player2.username} + \n`; 
        }
    }
}