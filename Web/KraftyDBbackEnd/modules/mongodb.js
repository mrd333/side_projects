var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/fin_news';
var connection = false;

var state = {
     db: null
};

exports.get = function(){
     return state.db;
};

exports.connect = function(){
     if(state.db){
          return done();
     }
     MongoClient.connect('mongodb://localhost:27017/fin_news', function(err,db){
          if(err){
               console.err('Error connecting to the database');
               console.err(err);
          }
          else{
               console.log('Successfully connected to the database');
               state.db = db;
          }
     });
};
