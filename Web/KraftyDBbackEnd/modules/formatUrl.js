/*
     formatUrl.js module
     ------------------
     Regular expressions for specific sites to drill down and capture the needed
     information.

*/

//site specfic regex's and urls
var websites = {
     penews : {
          dateReg: /(\d{1,2}) (\w{3,}) (\d{4})/,
          urlReg: /\d{5,}/,
          url: 'http://www.penews.com/'
     },
     preqnews: {
          //<-- Possibily needs to be removed
     },
     cmnews: {
          //<-- Add format by August
     }
};

//mongo listing scheme
var obj = {
     _id: null,
     description: null,
     date: null,
     url: null
};

exports.format = {
     //Return unique news list id for mongo _id
     uniqueId: function(url){
          return websites.penews.urlReg.exec(url)[0];
     },
     //Return
     unixDate: function(date){
          var re = websites.penews.dateReg.exec(date.toLowerCase()).slice(1,4);

     },
     //concatenate full url to add to listing in DOM
     fullLink: function(url){
          return websites.penews.url.concat(url);
     }
};
