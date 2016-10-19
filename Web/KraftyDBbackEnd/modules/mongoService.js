/*
     mongoService.js module
     ------------------
     Removes CRUD functionality from skrappy server to seperate module.
*/


var database = require('./mongodb.js');

// -------------- [SAVE SERVICE] --------------------

//Save array of objects to specified mongo collection
exports.saveToDb = function(array,collection){
     try
     {
          array.forEach(function(obj, i){
               database.get().collection(collection).save(obj, function(err,res){
                    if(err)
                    {
                         throw new Error('Insertion error with ' + obj);
                    }
                    console.log(i + ') ' + obj + ' Successfully inserted');
               });
          });
     }
     catch(exception)
     {
          console.log('Error saving data to Mongo-API, try path again \n');
     }
};

//============[SKRAPPY - QUERY SERVICE]=========================================

//Return JSON bars sorted by unique _id which ascends based on date of publication
exports.returnJSONlistings = function(collection){
     return database.get().collection(collection).find()
                          .sort({_id: -1}).toArray();
};

//Return all listing which inlcude specified keyword
exports.returnJSONincluding = function(value){
     return database.get().collection('penews').find({
           $text: { $search: value }
     }).toArray();
};

exports.returnJSONexlcuding = function(collection,keyword){
     //* Extra functionality - to be added in at a later date
};

exports.returnJSONbefore = function(collection, epoch){
     //* Extra functionality - to be added in at a later date
};

exports.returnJSONafter = function(collection,epoch){
     //* Extra functionality - to be added in at a later date
};

//===================[NYISE - GET SERVICE]===================================

//Return all bars unordered
exports.getAllBars = function(){
     return database.get().collection('bars').find().sort({_id: -1}).toArray();
};

//Return bars based on geospatial coordinates
exports.getClosestBar = function(lat,lng,amount){
     //set return limit to 1 if parameter undefined
     var num = (amount === undefined ? num = 1 : num = amount);

     return new Promise(function(resolve,reject){
          resolve(
               database.get().collection('bars').find(
               {
                    loc : {
                         $near :
                         {
                              $geometry: { type: 'Point', coordinates: [lng,lat]}
                         }
                    }
               }
          ).limit(num).toArray() ); });
};

//===================[NYISE - POST SERVICE]=====================================

//Build mongo document from obj argument and post to DB
exports.pushToCollection = function(obj){

          //Create document object from obj argument
          var reqDocument = {
               name: obj.name,
               area: obj.area,
               price: parseInt(obj.price),
               happyhour: [obj.hhstart, obj.hhfinish],
               drinks: obj.drinks,
               bites: obj.bites,
               url: obj.url,
               loc : {
                    type: "Point",
                    coordinates: [parseFloat(obj.lng), parseFloat(obj.lat)]
               }
          };

          //Retrieve the bar collection
          var collection = database.get().collection('bars');

          collection.insert(reqDocument, function(err,result){
               if(err){
                    console.log(err);
               }
               console.log(result);
          });

     };
