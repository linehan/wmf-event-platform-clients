import Foundation

struct Sampling {
    static func makeThresholds(weights: [Double], _ max_val: Int = 65535) -> [Double] {
        let mv = Double(max_val)
        var segments: [Double] = weights.map() { weight in weight * mv }
        for s in 1...(segments.count - 1) {
            segments[s] += segments[s - 1]
        }
        return segments
    }
    public static func inBucket(rand: Int, weights: [Double], _ max_val: Int = 65535) -> Int {
        let thresholds = makeThresholds(weights: weights, max_val);
        let buckets = weights.count;
        let r: Double = Double(rand)
        if buckets > 1 {
            for i in 1...buckets {
                if r < thresholds[i - 1] {
                    return i
                }
            }
            return -1 // should never be called in practice
        } else {
            return buckets
        }
    }
    public static func inSample(rand: Int, prob: Double, _ max_val: Int = 65535) -> Bool {
        return inBucket(rand: rand, weights: [prob, 1 - prob], max_val) == 1;
    }
}
