
modules.exports = function(){
    this.cleanupList = function(list){
        // also needs a cleanup functionality say for example
            // a -> b -> c -> d -> e
            // 1    2    2    1    2
            // two people are doing nothing
            // a -> b -> c -> d
            // 2    0    2    1
            // cleanup empty node
    }
}