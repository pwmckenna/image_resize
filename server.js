var request = require('request');
var gm = require('gm');
var im = gm.subClass({
    imageMagick: true
});
var express = require('express');
var _ = require('underscore');
var app = express();

app.get('/', function(req, res) {
    im(request.get({
        encoding: 'binary',
        uri: req.param('image')
    })).resize(req.param('width'), req.param('height')).stream().pipe(res);
});

app.listen(process.env.PORT || 3000);
