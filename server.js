var express = require('express'),
    app = express(),
    port = process.env.PORT || 1138;

var http = require('http');
var fs = require('fs');

var credContents = fs.readFileSync('creds.pi', 'utf8');
var credentials = credContents.split(/\r?\n/);
var api_key = credentials[0];
var controller_key = credentials[1];

// Hue Bridge Routes
//var api_root = '192.168.0.241/api/' + api_key +  '/';
var api_root = '/api/' + api_key +  '/';
var main_light_root = api_root + 'lights/2/';

// Controller Routes
var mainlight_on = controller_key + '/mainlight/on';
var mainlight_off = controller_key + '/mainlight/off';


// Scenes /mainlight/scene/[name]
// Colours /mainlight/colour/green
// Brightness /mainlight/brightness/up/down/number
// Fade Over Time
// On / Off
//Todo: add auth
//Todo: add to routing file for main light
app.get(mainlight_on, function(req, res) {
    console.log('Light on.');
    var requestURL = api_root + 'lights/2/state';

    var options = {
        host: '192.168.0.241',
        port: 80,
        path: requestURL,
        method: 'PUT'
    };

    var reqOut = http.request(options, function(resIn) {
        console.log("Sending");

    })
    reqOut.write('{"on":true}');
    reqOut.end();
    //req.json();
    res.json({message: "Done."})
});

app.get(mainlight_off, function(req, res) {
    console.log('Light off.');
    var requestURL = api_root + 'lights/2/state';

    var options = {
        host: '192.168.0.241',
        port: 80,
        path: requestURL,
        method: 'PUT'
    };

    var reqOut = http.request(options, function(resIn) {
        console.log("Sending");

    })
    reqOut.write('{"on":false}');
    reqOut.end();
    res.json({message: "Done."})
});


app.listen(port);
console.log('Listening on port ' + port);