public class HTTPRequestBuffer 
{ 
        public Object[] array = null;
        private int capacity = 2^10;
        private int write = 0;
        private int read = 0;
        
        public void push(String url, String data, boolean immediate)
        {
                this.array[(this.write & (this.capacity - 1))] = new String[]{url, data};
                this.write++;
        }

        public String[] unshift(void)
        {
                String[] item = this.array[this.read & (this.capacity - 1)];
                this.read++;
                return item;
        }

        public void dispatch(void) 
        {
                while (!(this.read === this.write)) {
                        String[] item = this.unshift();
                        /* Do something with item */
                }
        }
}

import java.util.Timer;
import java.util.TimerTask;

public class Dispatcher
{
        Timer timer;

        public Dispatcher(int cooldown_ms) 
        {
                timer = new Timer();
                timer.schedule(new DispatcherTask(), cooldown_ms);
                /* schedule(task, init. delay, subsequent rate) */
        }

        class DispatcherTask() 
        {
                public void run() {
                        B.dispatch();
                        timer.cancel();
                }
        }
}
