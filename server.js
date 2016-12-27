var joystick = new (require('joystick'))(0, 1, 350);

var express = require('express');
var app = express();

var port = process.env.PORT || '3000';

app.use('/', express.static(__dirname + '/app'));


var io = require('socket.io').listen(app.listen(port, function () {
  console.log('listening at port ' + port)
}));

//
// below the socketIO stuff
//

io.on('connection', function (client) {
  console.log('Client connected...');

  client.on('pause', function (data) {
    console.log('pause');
    io.emit('pause', data);
  });

  client.on('play', function (data) {
    console.log('play');
    io.emit('play', data);
  });

  client.on('init', function (data) {
    console.log('init');
    io.emit('init', data);
  });

  client.on('position', function (data) {
    // console.log('position ' + JSON.stringify(data));
    io.emit('position', data);
  });

});


joystick.on('axis', function (data) {
  // console.log('send steering ' + value);
  data.value = Math.floor((data.value + 32767) / 655.36);
  io.emit('steering', data);
});

