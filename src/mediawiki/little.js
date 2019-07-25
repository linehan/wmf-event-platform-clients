var HTTPRequestBuffer = {};
(function() {
        var capacity    = BUFFER_SIZE;
        var cooldown_ms = BUFFER_COOLDOWN_MS;
        var timer       = null;

        var buffer = [];
        var read   = 0;
        var write  = 0;

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


var StreamManager = {};
(function() {

        var execution_token = GET_EXECUTION_TOKEN();

        var install_token   = GET_CLIENT_TOKEN();
        var session_token   = GET_SESSION_TOKEN();
        var page_token      = GET_STREAM_CONFIG();

        function streamInSample(stream_name)
        {
                /* ... */
        }

        StreamManager.streamEvent = function(stream_name, data) { 
                if (!streamInSample(stream_name)) {
                        return -1;
                }

                var e = data;

                /* Stuff you add right now */
                e.timestamp = new Date();

                /* Stuff we manage */
                e.client_token = client_token;
                e.session_token = session_token;

                /* Stuff from stream configuration */
                e.name = config[stream_name].name;
                e.schema_url = config[stream_name].schema_url;

                return HTTPRequestBuffer.post(config[stream_name].url, e);
        };
})();


/* 
 * [JDL] In the actual MW code it will be coupled like this
 */
mw.trackSubscribe("event.", function() {
        StreamManager.post(stream_name, data);        
});
