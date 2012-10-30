var promisify = require('./js/promisify');
var request = require('request');
var get = promisify(request.get);
var async = require('promised-io/promise');
var im = require("imagemagick");
var express = require('express');
var _ = require('underscore');
var colorize = require('colorize');
var cconsole = colorize.console;

var app = express();
app.use(express.bodyParser());

//memoizing here works as a cache...but its even better than that.
//when you call for the second time with the same url, it doesn't
//matter if the first request has resolved or not. Both requests will
//get the same promise object, which will be resolved at the same time.
//so no timing issues to worry about...
//the caching is of the promise object, so dups of the results aren't
//stored in memory, and the storage of the objects themselves is in some
//tidy underscore closure
var request_image = _.memoize(function(url) {
    var ret = new async.Deferred();
    var options = {
        encoding: 'binary',
        uri: url
    };
    //make the GET request with content type binary
    var request = get(options);
    //only resolve the return object once we've validated the response.
    request.then(function(result) {
        if(result.statusCode === 200) {
            ret.resolve(result);
        } else {
            ret.reject();
        }
    }, function() {
        ret.reject();
    });
    return ret.promise;
});

//the resizing is pretty expensive, so lets cache these promise objects
//as well. making underscore's memoize use these giant data blogs as lookup
//keys is probably doubling the space needed for the same image, but the
//speed boost is huge.
var resize_image = _.memoize(function(data, width, height) {
    var ret = new async.Deferred();
    im.crop({
        srcData : data,
        width : width,
        height : height,
    }, function(err, stdout, stderr) {
        if(err) {
            ret.reject(err);
        } else {
            ret.resolve(stdout);
        }
    });
    return ret.promise;
});

app.get('/', function (req, res) {
    cconsole.log('#yellow[GET request]');
    //lets parse some args
    var width = req.param('w');
    var height = req.param('h');
    var image_url = req.param('u');

    cconsole.log(JSON.stringify([width, height, image_url], null, 4));

    //here's the course of action
    //1. grab remote image
    //2. resize it.
    //3. hand the resized image back to the original requestor
    var image_request = request_image(image_url);
    image_request.then(function(result) {
        var resize = resize_image(result.body, width, height);
        resize.then(function(stdout) {
            res.contentType(result.headers['content-type']);
            res.end(stdout, 'binary');
        }, function(err) {
            res.send(500, { error: err });
        });

        //display image resize result
        resize.then(
            function() { cconsole.log('image resize #green[success]'); },
            function() { cconsole.log('image resize #red[failure]'); }
        );
    }, function() {
        res.send(404);
    });

    //display image request result
    image_request.then(
        function() { cconsole.log('image request #green[success]'); },
        function() { cconsole.log('image request #red[failure]'); }
    );
});

app.listen(3000);
