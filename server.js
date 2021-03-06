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

http.listen(3001, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('new message', function(msg){
    try {
      var clientIp = socket.request.connection.remoteAddress;
      console.log(msg + " played form " + clientIp)
    } catch (e) {
      console.log(msg);
    }

    io.emit('new message', msg);
  });
});

// https://www.onlinevideoconverter.com/pt
// http://mp3cut.net/pt/
// https://www.myinstants.com/search/?name=sabia
