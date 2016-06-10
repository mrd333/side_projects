//Variables assigned for path cutting
var http = require('http');
var https = require('https');


//persistance in mongoDB offered
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mydb';



//Main server to recieve requests
http.createServer(function(req,res){

     //Switch to handle query string when request comes in.
     switch(req.method){
          case 'GET':
               switch(req.url){
                    case '/btc':
                         callBtcApi(req,res)
                         console.log(' btc called');
                         break;
                    case '/wallet':
                         callBtcWallet(req,res)
                         console.log('wallet called');
                         break;
                    case '/weather':
                         callWeather(req,res);
                         console.log('weather called');
                         break
                    default:
                         console.log('calling but not hitting');
                         break;
               }
          case 'POST':
               switch(req.url){
                    case '/update':
                         console.log('update called');
                         break;
               }
     }//end of main switch

}).listen(3000);


//Retrive daily value from BTC API
function callBtcApi(req,res){
     message = '';
     https.get('https://api.bitcoinaverage.com/ticker/global/GBP/', function(res){
          res.on('data',function(data){
               message += data;
          });
          res.on('end',function(){
               console.log('props called ;)');
               writeToCLient(res,message);
          });
     }).on('error', function(e){
          console.error(e);
     });
}

//write message to client
function writeToCLient(res,message){
     console.log(message);
     res.statusCode = 200;
     res.setHeader('Content-Type','application/json');
     res.end(JSON.stringify(message));
}

/*

https.get('https://api.bitcoinaverage.com/ticker/global/GBP/',(res)=> {
     var str = '';

     res.on('data', (d) => {
          str += d;
     });

     res.on('end', ()=>{
          MongoClient.connect(url,(err,db)=>{
               if(err){
                    console.log('error' + err);
               }
               else{
                    console.log('success');
                    var collection = db.collection('BTC');
                    collection.insert(JSON.parse(str));

               }
          })
     });

}).on('error',(e)=>{
     console.error(e);
});


setTimeout(function(){
     console.log(list)
},5000);

*/
