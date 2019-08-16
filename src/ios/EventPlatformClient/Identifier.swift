import Foundation

/* Based on the Event Platform Client - ID specification:
 * https://docs.google.com/document/d/1bfMV3SzLqIlXVTZzuy1GrwyfZ0FT68DeHZSxj1GU04M/edit#
 */

struct Identifier {
    private let session_id = UInt32(Date().timeIntervalSince1970)
    private let pageview_id = UInt16(arc4random_uniform(UInt32(2 << 15)))
    private var sequence_id = UInt16(0)
    public mutating func step() -> Void {
        self.sequence_id += 1
    }
    public func asSeparatedString(sep: String = "·") -> String {
        var id: String = String(self.session_id)
        id += sep + String(format: "%05i", self.pageview_id)
        id += sep + String(format: "%05i", self.sequence_id)
        return id
    }
    public func asString() -> String {
        var id: String = String(self.session_id)
        id += String(format: "%05i", self.pageview_id)
        id += String(format: "%05i", self.sequence_id)
        return id
    }
    public func asInteger() -> UInt64 {
        let uint64: UInt64 = UInt64(self.asString())!
        return uint64
    }
    public func asHex() -> String {
        return String(self.asInteger(), radix: 16, uppercase: false)
    }
}
