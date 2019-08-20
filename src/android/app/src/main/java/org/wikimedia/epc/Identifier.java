package org.wikimedia.epc;

import java.math.BigInteger;
import java.util.Locale;
import java.util.Random;

public class Identifier {
    private Long session_id;
    private Integer pageview_id;
    private Short sequence_id;
    public Identifier() {
        Random r = new Random();
        this.session_id = System.currentTimeMillis() / 1000;
        this.pageview_id = r.nextInt((int) (Math.pow(2, 16)));
        this.sequence_id = 0;
    }
    public void step() {
        this.sequence_id++;
    }
    public String asString(String separator) {
        String id = this.session_id.toString();
        id += separator + String.format(Locale.US, "%05d", this.pageview_id);
        id += separator + String.format(Locale.US, "%05d", this.sequence_id);
        return id;
    }
    public String asString() {
        return this.asString("");
    }
    public BigInteger asInteger() {
        return new BigInteger(this.asString());
    }
    public String asHex() {
        return this.asInteger().toString(16);
    }
    public Integer inBucket(Integer buckets) {
        if (buckets > 1) {
            Double segment_length = Math.pow(2, 16) / buckets;
            // determine which interval pageview_id falls into:
            for (int i = 1; i <= buckets; i++) {
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
