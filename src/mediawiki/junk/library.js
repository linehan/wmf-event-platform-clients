/******************************************************************************
 *                      HTTP REQUEST BUFFERING
 ******************************************************************************/
var HTTPRequestBuffer = (function() 
{
        function HTTPBuffer(url, bytes, cooldown_ms)
        {
                this.capacity = bytes; 
                this.array = [];
                this.read = 0;
                this.write = 0;
                this.url = url;
                this.cooldown_ms = cooldown_ms;
        }
        HTTPBuffer.prototype.dispatch = function() {
                /* While not empty */
                while (!(this.read === this.write)) {
                        /* Unshift */
                        var item = array[this.read & (this.capacity - 1)];
                        this.read++;
                        /* Send */
                        // sendBeacon(this.url, item);
                }
        };
        HTTPBuffer.prototype.post = function(str) {
                /* Push */
                this.array[(this.write & (this.capacity - 1))] = item;
                this.write++;
                /* Schedule */
                if ( !this.timer ) {
                        this.timer = setTimeout( this.dispatch, this.cooldown_ms );
                }
        };

        return HTTPBuffer;
})();



var HTTPRequestBuffer = (function() 
{
        var capacity;
        var array = [];
        var read = 0;
        var write = 0;
        var url;
        var cooldown;

        function dispatch() 
        {
                /* While not empty */
                while (!(this.read === this.write)) {
                        /* Unshift */
                        var item = array[this.read & (this.capacity - 1)];
                        this.read++;
                        // sendBeacon(this.url, item);
                }
        }
        function post(str) 
        {
                /* Push */
                this.array[(this.write & (this.capacity - 1))] = str;
                this.write++;

                this.schedule();
        }
        function schedule() 
        {
                if ( this.timer ) {
                        return;
                }
                this.timer = setTimeout( this.dispatch, this.cooldown_ms );
        }

        return Sender;
})();






var HTTPRequestBuffer = (function() 
{
        function HTTPBuffer(url, bytes, cooldown_ms)
        {
                this.capacity = bytes; 
                this.array = [];
                this.read = 0;
                this.write = 0;

                this.url = url;
                this.cooldown_ms = cooldown_ms;
        }
        HTTPBuffer.prototype.push = function(item) {
                this.array[(this.write & (this.capacity - 1))] = item;
                this.write++;
        };
        HTTPBuffer.prototype.unshift = function() {
                var item = array[this.read & (this.capacity - 1)];
                this.read++;
                return item;
        };
        HTTPBuffer.prototype.dispatch = function() {
                while (!(this.read === this.write)) {
                        var item = this.unshift();
                        // sendBeacon(this.url, item);
                }
        };
        HTTPBuffer.prototype.post = function(str) {
                this.push(str); 
                this.schedule();
        };
        HTTPBuffer.prototype.schedule = function() {
                if ( this.timer ) {
                        return;
                }
                this.timer = setTimeout( this.dispatch, this.cooldown_ms );
        };

        return Sender;
})();





var HTTPRequestBuffer = (function() 
{
        function Buffer(bytes)
        {
                this.capacity = bytes; 
                this.array = [];
                this.read = 0;
                this.write = 0;
        }
        Buffer.prototype.push = function(item) {
                this.array[(this.write & (this.capacity - 1))] = item;
                this.write++;
        };
        Buffer.prototype.unshift = function() {
                var item = array[this.read & (this.capacity - 1)];
                this.read++;
                return item;
        };

        function Sender(config)
        {
                this.buffer = new Buffer(config.buffer_size);
                this.url = config.url;
                this.cooldown_ms = config.cooldown_ms;
                this.timer = null;
        }
        Sender.prototype.post = function(str) {
                this.buffer.push(str); 
                this.schedule();
        };
        Sender.prototype.schedule = function() {
                if ( this.timer ) {
                        return;
                }
                this.timer = setTimeout( this.flush, this.cooldown_ms );
        };
        Sender.prototype.flush = function() {
                while (!(this.buffer.read === this.buffer.write)) {
                        var item = this.buffer.unshift();
                        // sendBeacon(this.url, item);
                }
        };

        return Sender;
})();

var B = new HTTPRequestBuffer({
        "url": "example.com",
        "buffer_size": 2**10,
        "cooldown_ms": 2000
});



/******************************************************************************
 *                      EVENT STREAM MANAGER 
 ******************************************************************************/

var StreamManager = (function() { 
})();


