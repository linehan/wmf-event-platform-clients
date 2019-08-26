class Identifier {
  constructor() {
    this.timestamp = Math.floor(new Date() / 1000);
    this.random = Math.floor(Math.random() * 65535);
    this.sequence = 0;
  }
  step() {
    this.sequence++;
  }
  toHex(separator = "") {
    let id = this.timestamp.toString(16);
    id += separator + this.random.toString(16).padStart(4, '0');
    id += separator + this.sequence.toString(16).padStart(4, '0');
    return id;
  }
  inBucket(weights) {
    let buckets = weights.length;
    if (buckets > 1) {
      let segments = new Array(buckets).fill(0);
      segments[0] = 65535 * weights[0];
      for (var s = 1; s < buckets; s++) {
        segments[s] = segments[s - 1] + (65535 * weights[s]);
      }
      for (var i = 0; i < buckets; i++) {
        if (this.random < segments[i]) {
          return i + 1; // number of segment aka bucket
        }
      }
      return -1;
    } else {
      return buckets;
    }
  }
}
