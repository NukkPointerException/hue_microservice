//JSON payloads used for modifying state of light ----------------------------------------------

module.exports = {
    light_bright: function () {
        return  '{"on": true, "bri": 254, "hue": 8402, "sat": 140}';
    },
    light_off: function () {
        return  '{"on":false}';
    },
    light_dim: function () {
        return '{"on":true, "bri": 77, "hue": 8402, "sat": 140}';
    },
    light_red: function () {
        return '{"on": true,"bri": 254,"hue": 65340,"sat": 251, "effect": "none","xy": [ 0.6822,0.3064]}';
    },
    light_green: function () {
        return '{"on": true,"bri": 254,"hue": 24432,"sat": 254, "effect": "none","xy": [0.1938,0.6821]}'
    },
    kitchen_on: function () {
        return '{"on": true,"bri": 254,"hue": 8418,"sat": 140,"effect": "none","xy": [0.4573,0.41]}'
    }
};