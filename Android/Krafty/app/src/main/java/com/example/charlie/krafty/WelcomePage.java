package com.example.charlie.krafty;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.content.Intent;


public class WelcomePage extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome_page);
    }

    public void goToMainPage(View view)
    {
        Intent intent = new Intent(this, mainSearchPage.class);
        startActivity(intent);
    }

}
