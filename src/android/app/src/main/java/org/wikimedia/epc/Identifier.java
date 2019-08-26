package org.wikimedia.epc;

import java.util.Random;

public class Identifier {
    private Long timestamp;
    private Integer random;
    private Short sequence;
    public Identifier() {
        Random r = new Random();
        this.timestamp = System.currentTimeMillis() / 1000;
        this.random = r.nextInt(65535);
        this.sequence = 0;
    }
    public void step() {
        this.sequence++;
    }
    public String toHex(String separator) {
        String id = Long.toHexString(this.timestamp);
        id += separator + String.format("%04x", this.random);
        id += separator + String.format("%04x", this.sequence);
        return id;
    }
    public String toHex() {
        return this.toHex("");
    }
    public int randomComponent() {
        return this.random.intValue();
    }
}
