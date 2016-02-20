var express = require('express');
var persistence = require('./src/server/persistence.js');
var cors = require('cors');
var app = express();
var server = app.listen(8080);
var io = require('socket.io')(server);

require('./src/server/server.js')(io, persistence);


// Use for debug
app.use(cors());
app.use(express.static(__dirname));
