var express = require('express');
var fs = require('fs');
var request = require('request');
var $ = require('cheerio');
var database = require('./modules/mongodb.js');

//server setup
var skrappy = express();
skrappy.listen('2016');
database.connect();



skrappy.get('/penews', function(req,res){
     url = 'http://www.penews.com/';
     request(url, function(error,response,html){
          if(!error){
               var parsed = $.load(html);

		console.log(getHeadlines());
          }//end of request
     });

});

skrappy.get('/newsscrape', function(req,res){
     url1 = 'http://www.penews.com/';

     request(url1, function(error,response,html){
          if(!error){
               var parsed = $.load(html);
               var output = getHeadlinesPE(parsed);
               saveToDb(output, 'penews');
          } else {
               console.err('Request to PEnews unsuccessful : ' + error);
          }
     }); //end of first request



});

//scrape PE news website
function getHeadlinesPE(context){
     var dbName = 'penews';
     var self = this;
     self.jsonReturn = [];
     context('#headlines li').each(function(i,v){
          var info = {};
          info.url = $('a',this).attr('href');
          info.description = $('a',this).html().trim();
          info.date = $('span',this).html().trim();
          self.jsonReturn.push(info);
     });
     console.log('Logged in the getHeadlinesPE function \n' + self.jsonReturn);
     return self.jsonReturn;
}

//Walk the dog successfully extracts each object from the array of objects
function saveToDb(array, collection){
     for(var i = 0; i < array.length; i++){
          database.get().collection(collection).save(array[i], function(err,res){
               if(err){
                    return console.err('Issue saving object to database : ' + err);
               }
               console.log('successfull save to the DB');
          });
     }
}

//Scrape prequin news website
function getHeadlinesPREQ(){
     //functionality to be included later
}

function getHeadlinesPREQ(){
     //functionality to be added later
}







console.log('Skrappy is up and running');
exports = module.exports = skrappy;

/*

//Walk the dog successfully extracts each object from the array of objects
function saveToDb(array, collection){
     for(var i = 0; i < array.length; i++){
          for(var key in array[i]){
               console.log(key + ' : ' + array[i][key]);
          }
          console.log('\n');
          console.log('New object entry ::');
          console.log('\n');
     }
}




*/
