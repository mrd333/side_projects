package com.example.charlie.krafty;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class mainSearchPage extends AppCompatActivity {

    EditText emailText;
    TextView responseView;
    ProgressBar progressBar;
    static final String API_KEY = "660889d540113df9";
    static final String API_URL = "https://api.fullcontact.com/v2/person.json?";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_search_page);

        responseView = (TextView)findViewById(R.id.responseView);
        emailText = (EditText) findViewById(R.id.emailText);
        progressBar = (ProgressBar)findViewById(R.id.progressBar);
    }

    /*
    class getEmailDetails extends AsyncTask<Void,Void,String>
    {
        private Exception e;

        protected void onPreExecute()
        {
            progressBar.set
        }
    } */

}
