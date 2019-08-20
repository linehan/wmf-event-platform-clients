package org.wikimedia.epc;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private Identifier id = new Identifier();
    private Integer n_buckets = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.updateTextViews();
    }
    public void updateTextViews() {
        TextView stringIdentifier = findViewById(R.id.stringIdentifier);
        stringIdentifier.setText(id.asString("·"));

        TextView hexIdentifier = findViewById(R.id.hexIdentifier);
        hexIdentifier.setText(id.asHex());

        TextView numberOfBuckets = findViewById(R.id.numberOfBuckets);
        String bucketsInfo = (n_buckets > 1 ? n_buckets + " buckets" : n_buckets + " bucket");
        numberOfBuckets.setText(bucketsInfo);

        TextView bucketInfo = findViewById(R.id.bucketInfo);
        bucketInfo.setText(id.inBucket(n_buckets).toString());
    }
    /** Called when the user taps the Step button */
    public void stepUp(View view) {
        id.step();
        this.updateTextViews();
    }
    /** Called when the user taps the Regenerate button */
    public void regenIdentifier(View view) {
        id = new Identifier();
        this.updateTextViews();
    }
    public void increaseBuckets(View view) {
        if (this.n_buckets <= 16) {
            this.n_buckets++;
            this.updateTextViews();
        }
    }
    public void decreaseBuckets(View view) {
        if (this.n_buckets > 1) {
            this.n_buckets--;
            this.updateTextViews();
        }
    }
}
