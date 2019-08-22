import Foundation

/* Based on the Event Platform Client - ID specification:
 * https://docs.google.com/document/d/1bfMV3SzLqIlXVTZzuy1GrwyfZ0FT68DeHZSxj1GU04M/edit#
 */

struct Identifier {
    private let timestamp = UInt32(Date().timeIntervalSince1970)
    private let random = UInt16(arc4random_uniform(UInt32(2 << 15)))
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
    public func inBucket(buckets: Int) -> Int {
        if buckets > 1 {
            let segment_length:Double = pow(2, 16) / Double(buckets)
            // determine which interval random falls into:
            for i in 1...buckets {
                if Double(self.random) < (segment_length * Double(i)) {
                    return i
                }
            }
            return -1 // should never be called in practice
        } else {
            return buckets
        }
    }
}
