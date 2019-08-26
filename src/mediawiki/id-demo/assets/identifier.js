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
  get hex() {
    return this.toHex();
  }
  randomComponent() {
    return this.random;
  }
}
