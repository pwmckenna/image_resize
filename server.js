var colorize = require('colorize');
var cconsole = colorize.console;

var promisify = require('./js/promisify');
var request = require('request');
var post = promisify(request.post);
var get = promisify(request.get);

var express = require('express');
var app = express();
app.use(express.bodyParser());
app.get('/', function(req, res){
	res.send({
		w: req.param('w', null),
		h: req.param('h', null),
		u: req.param('u', null)
	});
});

app.listen(3000);
console.log('Listening on port 3000');