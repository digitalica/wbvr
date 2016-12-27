var express = require('express');

var app = express();

var port = 3000;

app.use('/', express.static('app'));

app.listen(port, function () {
  console.log('listening at port ' + port)
});