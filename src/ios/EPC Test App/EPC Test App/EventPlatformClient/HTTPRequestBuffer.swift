import Foundation

struct ExampleEvent: Codable {
    let id: String
    let event: String
}

class HTTPRequestBuffer {

    let capacity: Int // maximum requests to keep in buffer
    let cooldown_ms: Int // interval at which to flush in a burst-mode
    var buffer = [(url: String, data: String)]()
    var enabled = true
    var timer: Timer?

    public func post(_ url: String, _ exampleEvent: ExampleEvent) -> Void {
        guard let jsonData = try? JSONEncoder().encode(exampleEvent) else {
            return
        }
        self.post(url, jsonData)
    }
    public func post(_ url: String, _ jsonData: Data) -> Void {
        let json = String(data: jsonData, encoding: String.Encoding.utf8)
        if json != nil {
            self.post(url, json!)
        }
    }
    public func post(_ url: String, _ data: String) -> Void {
        if self.buffer.count < self.capacity {
            self.buffer.append((url, data))
        }
    }

    public func pause() -> Void {
        self.enabled = false
    }

    public func unpause() -> Void {
        self.enabled = true
    }

    public func send(_ event: (url: String, data: String)) -> Void {
        if self.enabled {
            let url = URL(string: event.url)
            if url != nil {
                var request = URLRequest(url: url!)
                let data = event.data.data(using: String.Encoding.utf8)
                request.httpMethod = "POST"
                request.httpBody = data
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                URLSession.shared.dataTask(with: request) { _, response, _ in
                    if let httpResponse = response as? HTTPURLResponse {
                        print("response: \(httpResponse.statusCode)")
                    }
                }.resume()
            }
        } else {
            self.buffer.append(event)
        }
    }

    @objc public func flush() -> Void {
        // called when capacity is reached or the scheduled timer triggers
        while self.buffer.count > 0 && self.enabled {
            self.send(self.buffer.remove(at: 0))
        }
    }

    init(capacity: Int = 100, cooldown_ms: Int = 600) {
        self.capacity = capacity
        self.cooldown_ms = cooldown_ms
        let cooldown_sec: Double = Double(cooldown_ms) / 100.0
        self.timer = Timer.scheduledTimer(timeInterval: cooldown_sec, target: self, selector: #selector(flush), userInfo: nil, repeats: true)
    }
}
