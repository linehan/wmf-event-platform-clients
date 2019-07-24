var HTTPRequestBuffer = (function() {
        function HTTPRequestBuffer()
        {
                this.capacity = 2^10; /* User-configurable */

                this.array = [];
                this.read = 0;
                this.write = 0;
        }

        HTTPRequestBuffer.prototype.push = function(url, data, immediate)
        {
                this.array[(this.write & (this.capacity - 1))] = [url, data];
                this.write++;
        }

        HTTPRequestBuffer.prototype.unshift = function()
        {
                var item = array[this.read & (this.capacity - 1)];
                this.read++;
                return item;
        }

        HTTPRequestBuffer.prototype.dispatch = function() 
        {
                while (!(this.read === this.write)) {
                        var item = this.unshift();
                        /* Do something with item */
                }
        }

        return HTTPRequestBuffer;
})();

var HTTPRequestScheduler = (function() {

        var timer = null;
        var cooldown = 2000;

        var B = new HTTPRequestBuffer();

	function schedule() 
        {
	        // Don't unconditionally re-create the timer as that may 
                // post-pone execution indefinitely if different page 
                // components send metrics less than 2s apart before the 
                // user closes their window. Instead, only re-delay execution 
                // if the queue is small.
                //
                // JDL: Ehh? This comment seems like it's misleading.
                // Isn't the elseif just choosing not to wake up the
                // dispatcher unless we've reached a certain batchsize? 
                //
                // JDL: OOH, it's talking about the FIRST conditional! 
                // Well no kidding! How could you write 6 lines about this! 
		if ( !timer ) {
			timer = setTimeout( B.dispatch, cooldown );
		} else if ( queue.length < batchSize ) {
			clearTimeout( timer );
			timer = setTimeout( B.dispatch, cooldown );
		}
	}
})();

var StreamManager = (function() { 
})();
