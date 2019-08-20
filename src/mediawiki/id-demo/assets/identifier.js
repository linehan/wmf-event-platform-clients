class Identifier {
  constructor() {
    this.session_id = Math.floor(new Date() / 1000);
    this.pageview_id = Math.floor(Math.random() * 65535);
    this.sequence_id = 0;
  }
  step() {
    this.sequence_id++;
  }
  asString(separator = "") {
    let id = this.session_id.toString();
    id += separator + this.pageview_id.toString().padStart(5, '0');
    id += separator + this.sequence_id.toString().padStart(5, '0');
    return id;
  }
  inBucket(buckets) {
    if (buckets > 1) {
      let segment_length = 65535 / buckets;
      for (var i = 1; i <= buckets; i++) {
        if (this.pageview_id < (segment_length * i)) {
          return i;
        }
      }
      return -1;
    } else {
      return buckets;
    }
  }
}
