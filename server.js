var colorize = require('colorize');
var cconsole = colorize.console;

var promisify = require('./js/promisify');
var request = require('request');
var post = promisify(request.post);
var get = promisify(request.get);

var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello World');
});

app.listen(3000);
console.log('Listening on port 3000');