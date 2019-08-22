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
  inBucket(buckets) {
    if (buckets > 1) {
      let segment_length = 65535 / buckets;
      for (var i = 1; i <= buckets; i++) {
        if (this.random < (segment_length * i)) {
          return i;
        }
      }
      return -1;
    } else {
      return buckets;
    }
  }
}
