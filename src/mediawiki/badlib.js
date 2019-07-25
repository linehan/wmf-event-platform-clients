var Scheduler = (function(config) {
        var timer = null;

        var B = new Buffer(config.buffer_capacity_bytes);

        function schedule() 
        {
                if ( !timer ) {
                        timer = setTimeout( B.dispatch, config.cooldown_ms );
                //} else if ( B.array.length < config.cooldown_items ) {
                        //clearTimeout( timer );
                        //timer = setTimeout( B.dispatch, config.cooldown_ms );
                }
        }
})({"buffer_capacity_bytes": 2**10, "cooldown_ms":2000});
