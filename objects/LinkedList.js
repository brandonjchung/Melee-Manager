const { Node } = require('./Node.js');

module.exports = () => {
    this.head = null;
    this.tail = null;
    
    this.add = (user, map) => {
        // if new list instantiate head and tail
        if(head == null){
            let working = new Node(user);
            head = working;
            tail = working;
            map.set(user.id, working);
        }
        // fill in missing player slot
        else if(tail.player1 == null && tail.player2 != null){
            tail.player1 = user;
            map.set(user.id, tail);
            tail.next.incoming = null;
        }
        else if(tail.player2 == null && tail.player1 != null){
            tail.player2 = user;
            map.set(user.id, tail);
            tail.next.incoming = null;
        }
        // no open slot create new match node
        else{
            let working = new Node(user);
            tail.next = working;
            tail = working;
            tail.next = head;
            map.set(user.id, working);
            tail.next.incoming = user;
        }
    }
}