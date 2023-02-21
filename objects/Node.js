module.exports = function Node(user) {

    this.player1 = user;
    this.player2 = null;
    this.incoming = null;
    this.next = null;
    this.prev = null;

    this.getWinner = function(user){
        if(this.player1 === user){
            return `${this.player1} has defeated ${this.player2} \n`;
        }
        else{
            return `${this.player2} has defeated ${this.player1} \n`;
        }
    }
    
    this.getMatch = function(){
        if(this.incoming){
            return `${this.incoming} plays the loser of: ${this.player1} vs. ${this.player2}\n`; 
        }
        else if(this.player2 == null){
            return `${this.player1} plays the winner of: ${this.prev.player1} vs. ${this.prev.player2}`;
        }
        else if(this.player1 == null){
            return `${this.player2} plays the winner of: ${this.prev.player1} vs. ${this.prev.player2}`;
        }
        else{
            return `${this.player1} vs. ${this.player2}\n`; 
        }
    }
    
    this.getTailsMatch = function(){
        if(this.incoming){
            return `${this.incoming} plays the winner of: ${this.player1} vs. ${this.player2}\n`; 
        }
        else{
            return `${this.player1} vs. ${this.player2}\n`; 
        }
    }

    this.getHeadMatch = function(){
        if(this.player2 == null){
            return `${this.player1} plays the loser of: ${this.prev.player1} vs. ${this.prev.player2}`;
        }
        else if(this.player1 == null){
            return `${this.player2} plays the loser of: ${this.prev.player1} vs. ${this.prev.player2}`;
        }
        else{
            return `${this.player1} vs. ${this.player2}\n`; 
        }
    }
}