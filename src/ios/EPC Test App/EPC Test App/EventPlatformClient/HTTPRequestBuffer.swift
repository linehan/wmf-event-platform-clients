import Foundation
class HTTPRequestBuffer {

    var capacity: Int // maximum requests to keep in buffer
    var cooldown_ms: Int // interval at which to flush
    var buffer = [(url: String, data: String)]()
    var isPaused = false
    var timer: Timer?

    public func post(_ url: String, _ data: String) -> Void {
        if !self.isPaused {
            if self.buffer.count == self.capacity {
                self.flush()
            }
            self.buffer.append((url, data))
        }
    }

    public func pause() -> Void {
        print("pausing request buffer")
        self.isPaused = true
    }

    public func unpause() -> Void {
        print("resuming request buffer")
        self.isPaused = false
    }

    @objc public func flush() -> Void {
        // called when capacity is reached or the scheduled timer triggers
        if (self.buffer.count > 0) && !self.isPaused {
            print("flushing unpaused buffer holding \(self.buffer.count) events")
            for request in self.buffer {
                print("sending '\(request.data)' to endpoint at \(request.url)")
            }
            self.buffer.removeAll()
        }
    }

    init(capacity: Int, cooldown_ms: Int) {
        print("initializing a request buffer with capacity of \(capacity) requests and cooldown of \(cooldown_ms)ms")
        self.capacity = capacity
        self.cooldown_ms = cooldown_ms
        let cooldown_sec: Double = Double(cooldown_ms) / 100.0
        self.timer = Timer.scheduledTimer(timeInterval: cooldown_sec, target: self, selector: #selector(flush), userInfo: nil, repeats: true)
    }
}
