// Set a deadzone of +/-3500 (out of +/-32k) and a sensitivty of 350 to reduce signal noise in joystick axis
var joystick = new (require('joystick'))(0, 1, 350);


var sl = 0;
var sr = 0;
var k1 = 0;
var k2 = 0;

function printStatus() {
    var sls = '      '  + sl;
    sls = sls.substr(sls.length - 5);

    var srs = '      '  + sr;
    srs = srs.substr(srs.length - 5);

    console.log('L: ' + sls + ' R: ' + srs + ' k1: ' + k1 + ' k2 ' + k2);
}


joystick.on('button', function (value) {
    switch (value.number) {
        case 0:
            k1 = value.value;
            break;
        case 1:
            k2 = value.value;
            break;
    }
    // console.log(value);
    printStatus();
});

joystick.on('axis', function (value) {
    switch (value.number) {
        case 0:
            sl = value.value + 32767;
            break;
        case 1:
            sr = value.value + 32767;
            break;
    }
    // console.log(value);
    printStatus();
});