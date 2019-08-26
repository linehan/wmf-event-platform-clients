package org.wikimedia.epc;

public class Sampling {
    private static double[] makeThresholds(double[] weights, int max_val) {
        double mv = ((double) max_val);
        double[] thresholds = new double[weights.length];
        thresholds[0] = mv * weights[0];
        for (int i = 1; i < weights.length; i++) {
            thresholds[i] = thresholds[i - 1] + (mv * weights[i]);
        }
        return thresholds;
    }
    private static double[] makeThresholds(double[] weights) {
        return makeThresholds(weights, 65535);
    }
    public static int inBucket(int rand, double[] weights, int max_val) {
        double r = (double) rand;
        if (weights.length > 1) {
            double[] thresholds = makeThresholds(weights, max_val);
            for (int i = 0; i < thresholds.length; i++) {
                if (r < thresholds[i]) {
                    return i + 1;
                }
            }
            return -1;
        } else {
            return weights.length;
        }
    }
    public static int inBucket(int rand, double[] weights) {
        return inBucket(rand, weights, 65535);
    }
    public static boolean inSample(int rand, double prob, int max_val) {
        double[] weights = {prob, 1 - prob};
        return inBucket(rand, weights, max_val) == 1;
    }
    public static boolean inSample(int rand, double prob) {
        return inSample(rand, prob, 65535);
    }
}
