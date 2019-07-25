var HTTPRequestBuffer = {};
(function() {
        var capacity    = BUFFER_SIZE;
        var cooldown_ms = BUFFER_COOLDOWN_MS;
        var timer       = null;

        var buffer = [];
        var read = 0;
        var write = 0;

        function buffer_flush() 
        {
                while (!(read === write)) {
                        var item = buffer[read++ & (capacity - 1)];
                        sendBeacon(item[0], item[1]);
                }
        }

        HTTPRequestBuffer.post = function(url, str) 
        {
                buffer[(write++ & (capacity - 1))] = [url, str];

                if ( !timer ) {
                        timer = setTimeout( buffer_flush, cooldown_ms );
                }
        };
        HTTPRequestBuffer.pause = function() {
                /* ... */
        };
        HTTPRequestBuffer.unpause = function() {
                /* ... */
        };
})();


var HTTPRequestBuffer = {};
(function() {
        var capacity    = BUFFER_SIZE;
        var cooldown_ms = BUFFER_COOLDOWN_MS;
        var timer       = null;

        var buffer = [];
        var read = 0;
        var write = 0;

        function buffer_push(item) 
        {
                buffer[(write++ & (capacity - 1))] = item;
        }
        function buffer_flush() 
        {
                while (!(read === write)) {
                        var item = buffer[read++ & (capacity - 1)];
                        sendBeacon(item[0], item[1]);
                }
        }
        function buffer_schedule() 
        {
                if ( !timer ) {
                        timer = setTimeout( buffer_flush, cooldown_ms );
                }
        }

        HTTPRequestBuffer.post = function(url, str) 
        {
                buffer_push([url, str]); 
                buffer_schedule();
        };
        HTTPRequestBuffer.pause = function() {
                /* ... */
        };
        HTTPRequestBuffer.unpause = function() {
                /* ... */
        };
})();
