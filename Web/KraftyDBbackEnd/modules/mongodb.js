/*
     mongodb.js module
     ------------------
     Sets up the connection to mongoDB
*/

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/skrappy';

//OPENshift parameters to take advantage of env vars where possible
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  url = process.env.OPENSHIFT_MONGODB_DB_URL + 'skrappy';
}

//State kept in object for reference
var state = {
     db: null
};

//Return database [skrappy]
exports.get = function(){
     return state.db;
};

//Connect to database and save state
exports.connect = function(){
     if(state.db){
          return message('Your already connected to ' + state.db);
     }
     MongoClient.connect(url, function(err,db){
          if(err){
               console.log('Error connecting to the database');
               console.log(err);
          }
          else{
               console.log('Successfully connected to the database');
               state.db = db;
          }
     });
};

exports.close = function(){
          //code to go here;
};
