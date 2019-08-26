import Foundation

/* Based on the Event Platform Client - ID specification:
 * https://docs.google.com/document/d/1bfMV3SzLqIlXVTZzuy1GrwyfZ0FT68DeHZSxj1GU04M/edit#
 */

struct Identifier {
    private let timestamp = UInt32(Date().timeIntervalSince1970)
    private let random = UInt16(arc4random_uniform(65535))
    private var sequence = UInt16(0)
    public mutating func step() -> Void {
        self.sequence += 1
    }
    public func toHex(separator: String = "") -> String {
        var id: String = String(self.timestamp, radix: 16)
        id += separator + String(format: "%04x", self.random)
        id += separator + String(format: "%04x", self.sequence)
        return id
    }
    public func randomComponent() -> Int {
        return Int(self.random);
    }
}
