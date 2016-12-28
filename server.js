var joystickId = 0;
var joystick;
var fs = require('fs');
if (fs.existsSync("/dev/input/js" + joystickId)) {
    joystick = new (require('joystick'))(joystickId, 1, 350);
} else {
    console.log('Controller not connected!!!');
}

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

if (joystick) {
    joystick.on('axis', function (data) {
        // console.log('send steering ' + data.value);
        data.value = Math.floor((data.value + 32767) / 655.36);
        io.emit('steering', data);
    });
    joystick.on('button', function (data) {
        console.log('send button ' + data.value);
        io.emit('button', data);
    });
}