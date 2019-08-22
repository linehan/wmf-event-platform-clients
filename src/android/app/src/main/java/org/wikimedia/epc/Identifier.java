package org.wikimedia.epc;

import java.math.BigInteger;
import java.util.Locale;
import java.util.Random;

public class Identifier {
    private Long timestamp;
    private Integer random;
    private Short sequence;
    public Identifier() {
        Random r = new Random();
        this.timestamp = System.currentTimeMillis() / 1000;
        this.random = r.nextInt((int) (Math.pow(2, 16)));
        this.sequence = 0;
    }
    public void step() {
        this.sequence++;
    }
    public String toHex(String separator) {
        String id = this.timestamp.toString();
        id += separator + String.format("%04x", this.random);
        id += separator + String.format("%04x", this.sequence);
        return id;
    }
    public String toHex() {
        return this.toHex("");
    }
    public Integer inBucket(Integer buckets) {
        if (buckets > 1) {
            Double segment_length = Math.pow(2, 16) / buckets;
            // determine which interval random component falls into:
            for (int i = 1; i <= buckets; i++) {
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
