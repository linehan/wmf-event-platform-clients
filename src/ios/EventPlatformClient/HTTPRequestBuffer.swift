import Foundation
struct HTTPRequestBuffer {

    var capacity: Int
    var cooldown_ms: Int
    var buffer = [(url: String, data: String)]()
    var isPaused = false

    public mutating func post(_ url: String, _ data: String) -> Void {
        if !self.isPaused {
            if self.buffer.count == self.capacity {
                self.flush()
            }
            self.buffer.append((url, data))
        }
    }

    public mutating func pause() -> Void {
        self.isPaused = true
    }

    public mutating func unpause() -> Void {
        self.isPaused = false
    }

    public mutating func flush() -> Void {
        // called when capacity is reached
        print("capacity reached, flushing buffer")
        for request in self.buffer {
            print("sending '\(request.data)' to endpoint at \(request.url)")
        }
        self.buffer.removeAll()
    }

    init(capacity: Int, cooldown_ms: Int) {
        self.capacity = capacity
        self.cooldown_ms = cooldown_ms
    }
}
