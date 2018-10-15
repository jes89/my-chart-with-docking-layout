const express = require("express");
const route = require('./route');
const wsServer = require('./utils/webSocketUtil');
const app = express();
const router = express.Router(); 


app.set('view engine', 'pug'); 

app.use(express.static(__dirname + "/resource"));

app.use('/', route);

app.listen(8080, function() {});

module.exports = { app, router }; 
