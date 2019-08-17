package org.wikimedia.epc;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    public Identifier id = new Identifier();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.updateIdentifierTextView();
    }
    public void updateIdentifierTextView() {
        TextView t1 = findViewById(R.id.stringIdentifier);
        TextView t2 = findViewById(R.id.hexIdentifier);
        t1.setText(id.asString("·"));
        t2.setText(id.asHex());
    }
    /** Called when the user taps the Step button */
    public void step(View view) {
        id.step();
        this.updateIdentifierTextView();
        // increment sequence component of the identifier (and update the text view?)
    }
    /** Called when the user taps the Regenerate button */
    public void regen(View view) {
        // regenerate ID (and update identifierTextView?)
        id = new Identifier();
        this.updateIdentifierTextView();
    }
}
