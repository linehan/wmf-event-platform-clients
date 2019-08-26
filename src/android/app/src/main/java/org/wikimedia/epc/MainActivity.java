package org.wikimedia.epc;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Switch;
import android.widget.TextView;

import java.util.Arrays;

public class MainActivity extends AppCompatActivity {

    private Identifier id = new Identifier();
    private int[] stats = {0, 0, 0, 0};
    private int bucket = 0;
    private double[] prob1 = {0.25, 0.25, 0.25, 0.25};
    private double[] prob2 = {0.40, 0.10, 0.30, 0.20};

    private void resetBucketingStats() {
        this.stats = new int[]{0, 0, 0, 0}; // reset stats
    }
    private void updateBucketingStats() {
        Switch bucketWeightsSwitch = findViewById(R.id.equalWeightsSwitch);
        double[] probs = bucketWeightsSwitch.isChecked() ? prob1 : prob2;
        this.bucket = Sampling.inBucket(id.randomComponent(), probs);
        this.stats[this.bucket - 1]++; // update bucketing stats
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.updateBucketingStats();
        this.updateTextViews();
    }

    public void updateTextViews() {
        TextView idTV = findViewById(R.id.identifier);
        idTV.setText(id.toHex());

        TextView bucketInfoTV = findViewById(R.id.bucketInfo);
        bucketInfoTV.setText(String.format("%d", this.bucket));

        TextView bucketStatsTV = findViewById(R.id.bucketingStats);
        bucketStatsTV.setText(Arrays.toString(stats));
    }

    /** Called when the user taps the Step button */
    public void stepUp(View view) {
        this.id.step();
        this.updateTextViews();
    }
    /** Called when the user taps the Regenerate button */
    public void regenIdentifier(View view) {
        this.id = new Identifier();
        this.updateBucketingStats();
        this.updateTextViews();
    }
    /** Called when the user switches the bucket weights */
    public void switchBucketWeights(View view) {
        this.resetBucketingStats();
        this.updateBucketingStats();
        this.updateTextViews();
    }
}
