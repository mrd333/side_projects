/*

     Handle incoming HTTP request logic for users adding keywords to narrow
     returned JSON results.
     This is the BRAIN for all incoming requests! :)

*/

//Database connection/functionality modules
var database = require('./mongodb.js');
var dbService = require('./mongoService.js');

//bar listing module
var bars = require('../tempJSON/barlistings.js');
var distance = require('./distance.js');


// ============== [SKRAPPY API REQUESTS] ================

exports.getApiRequest = function(keyword,value){
     switch(keyword.toLowerCase()){
          case "include":
          console.log('in the include');
               getKeyword(value);
               break;
          case "exclude":
               getNotKeyword(value);
               break;
          case "before" || "after":
               getDate(keyword,value);
               break;
          default:
               console.log('Nothing captured');
               return {name: "charlie"};
     }
};

//---> Needs attention still - Not resolving correctly
function getKeyword(value){
     var awaitResult = new Promise(function(resolve,reject){
          resolve(dbService.returnJSONincluding(value));
     });
     awaitResult.then(function(data){
          console.log('This is the +++++++ +++++ ++++++ +++++  ' + data);
     });
}

//========================[NYISE API REQUESTS FROM MONGODB]=====================

//Send JSON bar list to browser to confirm connection
exports.mongoReturnJSONbars = function(){
     return dbService.getAllBars();
};

//send JSON barlist based on user location
exports.mongoReturnClosest = function(lat,lng,amount){
     return new Promise(function(resolve,reject){
          resolve(dbService.getClosestBar(lat,lng,amount));
     });
};

//========================[BACKUP || NYISE API REQUESTS FROM TEMPJSON]==========

//Return bars held in backup JSON file
exports.returnJSONbars = function(){
     return bars.allBars();
};

//Return closest bar held in the JSON file
exports.getClosestBar = function(userCoords){
     distance.init(userCoords);
     return distance.getClosest();
};

//Add bar to current collection
exports.postBar = function(object){
     dbService.pushToCollection(object);
};
