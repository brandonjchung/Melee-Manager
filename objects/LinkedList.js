const Node = require('./Node.js');

module.exports = function LinkedList() {
    this.head = null;
    this.tail = null;

    this.add = function add(user, map) {
        // if new list instantiate head and tail
        if (this.head == null) {
            let working = new Node(user);
            this.head = working;
            this.tail = working;
            this.tail.next = this.head;
            this.tail.prev = this.head;
            map.set(user.id, working);
        }
        // fill in missing player slot
        else if (this.tail.player1 == null && this.tail.player2 != null) {
            this.tail.player1 = user;
            map.set(user.id, this.tail);
        }
        else if (this.tail.player2 == null && this.tail.player1 != null) {
            this.tail.player2 = user;
            map.set(user.id, this.tail);
        }
        // no open slot create new match node
        else {
            let working = new Node(user);
            this.tail.next = working;
            working.prev = this.tail;
            this.tail = working;
            this.tail.next = this.head;
            this.head.prev = this.tail;
            map.set(user.id, working);
        }
    }
}