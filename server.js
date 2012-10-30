var request = require('request')

var express = require('express');
var app = express();
app.use(express.bodyParser());

app.get('/', function(req, response){
    var width, height, url;
    width = req.param('w', null);
    height = req.param('h', null);
    url = req.param('u', null);

    console.log('image request:');
    console.log(JSON.stringify({
        width: width,
        height: height,
        url: url
    }, null, 4));
    request.get(url).pipe(response);
});

app.listen(3000);
