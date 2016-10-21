$(function(){

  //Set the io connetion up
  var socket = io.connect();

  //Holder
  var clicked = 'nope';

  //Set variables up to assign event handlers
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $messageArea = $('#messageArea');

  var userFormArea= $('#userFormArea');
  var $userForm = $('#userForm');
  var $users = $('#users');
  var $username = $('#username');

  /* INDEX JS
  ========== */

  /**
  * Emit to server create room command
  * @param -> socket command
  * @return -> HREF redirection
  */
  var create = document.getElementById("create_room");
  create.addEventListener('click', function(e){
    console.log('clicked');
    socket.emit('create-room', prompt("Username?"));
    window.location.href ='/chat.html';
  });

  /**
  * Join existing room held on the server
  * @param -> 1) User Id. 2) Socket ID
  */
  var join = document.getElementById('join_room');
  join.addEventListener('click', function(e){
    console.log('join clicked');
    socket.emit('join-room', prompt('Username'), prompt('room number'));
    window.location.href = '/chat.html';
  });


  /* CHAT JS
  ========= */

  //Add event handler to submit button and send data to the server
  $messageForm.submit(function(e){
    console.log(clicked);
    e.preventDefault();

    //socket.emit('send-message', $message.val());
    $message.val('');
  });

  //Recieve message that has been broadcast out
  socket.on('new-message', function(data){
    $chat.append('<div class="well">' + data.msg + '</div>');
  });

  //
  $userForm.submit(function(e){
    e.preventDefault();
    socket.emit('new user', $username.val(), function(data){
      if(data){
        $userFormArea.hide();
        $messageArea.show();
      }
    });
    $username.val('');
  });

});
