/*
     scrapee.js module
     ------------------
     Provides the server with the scrape commands it needs for the websites
*/

//Node and 3rd party modules
var request = require('request');
var $ = require('cheerio');

//request personal modules
var dbService = require('./mongoService.js');
var Format = require('./formatUrl.js');

var URLs = {
     penews: 'http://www.penews.com/',
     blooms: 'http://www.something.com/',
     jill:   'http://www.exie.com'
};

/* ====================== [PENEWS SCRAPES] =============================== */

exports.PENEWS = function(){
     request(URLs.penews, function(error,response,html){
          if(error)
          {
               console.err('Request to PE News unsuccessful : ' + error );
          }
          else
          {
               var data = $.load(html);
               var docArray = scrapePE(data);
               dbService.saveToDb(docArray, 'penews');
          }
     });
};

//Scrape data from PEnews HTML and manipulate into object
function scrapePE(data){
     array = [];
     data('#headlines li').each(function(i,v){
          var headline = $('a',this).html().trim();
          var url = $('a', this).attr('href');
          var date = $('span', this).html().trim();
          var _id = Format.format.uniqueId(url);
          var link = Format.format.fullLink(url);
          var epoch = new Date().valueOf();

          var listing = {
               _id: _id,
               description: headline,
               date: date,
               src: link,
               epoch: epoch
          };
          array.push(listing);
     });
     return array;
}

/* ======================= [BLOOM SCRAPES] =============================== */
