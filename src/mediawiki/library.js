var Buffer = {};
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

        Buffer.post = function(url, str) 
        {
                buffer[(write++ & (capacity - 1))] = [url, str];

                if ( !timer ) {
                        timer = setTimeout( buffer_flush, cooldown_ms );
                }
        };
        Buffer.pause = function() {
                /* ... */
        };
        Buffer.unpause = function() {
                /* ... */
        };
})();


var TokenManager = {};
(function() {


        var screen_token;
                var feature_token; /* a single feature on a page */
        var session_token; /* a set of things being done */
                var workflow_token; /* a workflow funnel; series of features/pages */
        var instance_token; /* a run of the software, including suspends */
        var install_token; /* bad */

})();


function UUID() 
{

}


var Stream = {};
(function() {

        // single install 
        //      web: localStorage 
        //      ios: app lifetime
        //      and: app lifetime
        var install_token   = GET_CROSS_SESSION_TOKEN();

        // single execution
        //      web: pageload/pageview
        //      ios: app lifetime
        //      and: app lifetime
        var instance_token  = GET_INSTANCE_TOKEN(); 
        var session_token   = GET_SESSION_TOKEN();
        var page_token      = GET_STREAM_CONFIG();

        function sample(stream_name)
        {
                /* ... */
        }

        Stream.event = function(stream_name, data) { 
                if (!sample(stream_name)) {
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

                return Buffer.post(config[stream_name].url, e);
        };
})();

/* 
 * [JDL] In the actual MW code it will be coupled like this
 */
mw.trackSubscribe("event.", function() {
        Stream.post(stream_name, data);
});
