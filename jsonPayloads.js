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
    }
};