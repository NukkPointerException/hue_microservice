var express = require('express'),
    app = express(),
    port = process.env.PORT || 1138;

var http = require('http');
var fs = require('fs');

//Todo: Move these values to a properties utility class
//Keep API key in a git ignored file
var credContents = fs.readFileSync('creds.pi', 'utf8');
var credentials = credContents.split(/\r?\n/);
//API key created by hue bridge for access
var api_key = credentials[0];
//Personally generated key to prevent unauthorized users on the local network from accessing the controller
var controller_key = credentials[1];

//Get mapping of light name to light number
//var bedroomLight = '3';
var bedroomLight = '1';
var sittingroomLight = '2';

var bridgeIP = '192.168.0.241';
var bridgePort = '80';


// Hue Bridge Routes
//var api_root = '192.168.0.241/api/' + api_key +  '/';
//IP is defined when building request
var api_root = '/api/' + api_key +  '/';
var sittingroom_light_root = api_root + 'lights/2/';
var bedroom_light_root = api_root + 'lights/' + bedroomLight + '/';

// Controller Routes
//todo move to route builder function
var sittingroomLight_on = controller_key + '/sittingroomLight/on';
var sittingroomLight_off = controller_key + '/sittingroomLight/off';

var bedroomLight_on = controller_key + '/bedroomLight/on';
var bedroomLight_off = controller_key + '/bedroomLight/off';
//Getting fancy
var bedroomLight_dim = controller_key + '/bedroomLight/dim';

//JSON payloads
//todo: move to own class
var light_bright = '{"on": true, "bri": 254, "hue": 8402, "sat": 140}';
var light_off = '{"on":false}';
var light_dim = '{"on":true, "bri": 77, "hue": 8402, "sat": 140}';

app.get(bedroomLight_on, function(req, res) {
    console.log('Bedroom Light on.');
    var requestURL = bedroom_light_root + 'state11';

    //Build URL to send request to
    var options = {
        host: '192.168.0.241',
        port: 80,
        path: requestURL,
        method: 'PUT'
    };

    var reqOut = http.request(options, function(resIn) {
        console.log("Sending");
        resIn.on("data", function(chunk) {
            console.log("BODY: " + chunk);
            //JSON.parse(chunk);
        });
    });
    //Setting JSON payload to tell bridge what we want to do.
    reqOut.write(light_bright);
    reqOut.end();
    //req.json();
    res.json({message: "Done."})
});

app.get(bedroomLight_off, function(req, res) {
    console.log('Bedroom Light off.');
    var requestURL = bedroom_light_root + 'state';

    //Build URL to send request to
    var options = {
        host: '192.168.0.241',
        port: 80,
        path: requestURL,
        method: 'PUT'
    };

    var reqOut = http.request(options, function(resIn) {
        console.log("Sending");

    });
    //Setting JSON payload to tell bridge what we want to do.
    reqOut.write(light_off);
    reqOut.end();
    //req.json();
    res.json({message: "Done."})
});

app.get(bedroomLight_dim, function(req, res) {
    console.log('Bedroom Light dim.');
    var requestURL = bedroom_light_root + 'state';

    //Build URL to send request to
    var options = {
        host: '192.168.0.241',
        port: 80,
        path: requestURL,
        method: 'PUT'
    };

    var reqOut = http.request(options, function(resIn) {
        console.log("Sending");

    });
    //Setting JSON payload to tell bridge what we want to do.
    reqOut.write(light_dim);
    reqOut.end();
    //req.json();
    res.json({message: "Done."})
});

// Scenes /mainlight/scene/[name]
// Colours /mainlight/colour/green
// Brightness /mainlight/brightness/up/down/number
// Fade Over Time
// On / Off
//Todo: add auth
//Todo: add to routing file for main light
app.get(sittingroomLight_on, function(req, res) {
    console.log('Light on.');
    var requestURL = api_root + 'lights/2/state';

    /*var options = {
        host: '192.168.0.241',
        port: 80,
        path: requestURL,
        method: 'PUT'
    };

    var reqOut = http.request(options, function(resIn) {
        console.log("Sending");

    })
    reqOut.write('{"on":true}');
    reqOut.end();*/
    //req.json();
    res.json({message: "Done."})
});

app.get(sittingroomLight_off, function(req, res) {
    console.log('Light off.');
    var requestURL = api_root + 'lights/2/state';

   /* var options = {
        host: '192.168.0.241',
        port: 80,
        path: requestURL,
        method: 'PUT'
    };

    var reqOut = http.request(options, function(resIn) {
        console.log("Sending");

    })
    reqOut.write('{"on":false}');
    reqOut.end();*/
    res.json({message: "Done."})
});



app.listen(port);
console.log('Listening on port ' + port);