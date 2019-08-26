class Sampling {
  static makeThresholds(weights, max_val = 65535) {
    let segments = weights.map( function( weight ) {
      return weight * max_val;
    } )
    for (var s = 1; s < segments.length; s++) {
      segments[s] += segments[s - 1];
    }
    return segments;
  }
  static inBucket(rand, weights, max_val = 65535) {
    let buckets = weights.length;
    if (buckets > 1) {
      let segments = Sampling.makeThresholds(weights, max_val);
      for (var i = 0; i < buckets; i++) {
        if (rand < segments[i]) {
          return i + 1; // number of segment aka bucket
        }
      }
      return -1;
    } else {
      return buckets;
    }
  }
  static inSample(rand, prob, max_val = 65535) {
    return Sampling.inBucket(rand, [prob, 1 - prob], max_val) == 1;
  }
}