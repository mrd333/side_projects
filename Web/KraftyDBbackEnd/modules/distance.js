/*
     Haversine formula for calculating distance based on lat/lng

*/

//import barList
var barList = require('../tempJSON/barlistings.js');

//setup bar object and holding object
var bars = barList.allBars().bars;

//Intialize new array of bars based on user coordinates
exports.init = function(userCoords){

     //Cycle through each bar listing object and retrieve lat/lng coords
     for(var i = 0; i < bars.length; i++){
          var barCoords = {
               lat: bars[i].coords.lat,
               lng: bars[i].coords.lng
          };

          //add distance property to each bar listing object
          bars[i].distance = distanceCheck(userCoords,barCoords);
     }

     //sort bars into array by ascending distance
     bars.sort(function(a,b){
          return a.distance - b.distance;
     });

};

exports.getClosest = function(userCoords){
     return bars[0];
};

exports.getBarsWithDistance = function(){
     return bars;
};

exports.getCloset5 = function(){
     if(bars.length > 5) {
          return bars.slice(0,5);
     }else{
          return "Bar count lower than 5";
     }
};

// ============ [Haversine Formula] ====================

//implement the haversine forumla to find the closest one;
function distanceCheck(userCoords,barCoords){
     var R = 6371;
     var dLat = toRad(userCoords.lat - barCoords.lat);
     var dLng = toRad(userCoords.lng - barCoords.lng);
     var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(userCoords.lat)) *
             Math.sin(dLng/2) * Math.sin(dLng/2);
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R * c;
     return d;
}

//short hack to cut down on code
function toRad(x){
     return x * Math.PI / 180;
}
