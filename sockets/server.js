/* ============================================================================
                BASIC CHAT APP TEMPLATE USING SOCKETS
=============================================================================*/

/*jslint node: true */
"use strict";

/*MAIN MODULES
===================== */
const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http);

var users = [];
var connections = [];
var rooms = {};

/* ROUTE CALLS
=============*/
app.get('/', (req,res)=> {
  res.sendFile(__dirname + '/index.html');
});

/* SOCKET CALLS
============== */
/*
* On intial connection from the user
*
*/
io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected - Socket id
               : ${socket.id}`);

  /*
  * On user - closes the connection (quits browser)
  */
  socket.on('disconnect', (data) => {
    if(!socket.username){
      return;
    }
    users.splice(users.indexOf(socket.username), 1);
    connections.splice(connections.indexOf(socket),1);
    console.log(`Disconnected: ${connections.length} sockets connected`);
  });

  /*
  * On server - recieves socket emit matching 'send-message'
  */
  socket.on('send-message', (data) => {
    console.log(data);
    io.sockets.emit('new-message', { msg: data });
  });

});


/* START SERVER
============= */
http.listen(3000, ()=> {
  console.log('SS LOG: Application server listening on 3000');
});
