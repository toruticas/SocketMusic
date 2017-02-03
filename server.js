var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/sound-player', function(req, res){
  res.sendFile(__dirname + '/sound-player.html');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('new message', function(msg){
    console.log('message: ' + msg);
    io.emit('new message', msg);
  });
});

// https://www.onlinevideoconverter.com/pt
// http://mp3cut.net/pt/
