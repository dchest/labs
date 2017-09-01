var rngs = {
    'crypto.getRandomValues': window.crypto.getRandomValues.bind(window.crypto),
    'jitterrand': require('../jitterrand'),
    'bitfliprand': require('../bitfliprand')
}

var width = 400,
    height = 400,
    bits = new Uint8Array(width * height / 8);

function getbit(pos) {
    return (bits[pos / 8 | 0] >> (7 - (pos % 8))) & 1;
}

Object.keys(rngs).forEach(function(name) {
    for (var i = 0; i < bits.length; i++) bits[i] = 0;
    rngs[name](bits);

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(document.createTextNode(name));
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(canvas);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(document.createElement('br'));

    var ctx = canvas.getContext("2d");
    var pos = 0;
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            if (getbit(pos++)) ctx.fillRect(x, y, 1, 1);
        }
    }
});
