/**
 * Created by robbert on 24-12-16.
 */

var fs = require('fs');
var async = require('async');
var gm = require('google-static-map').set('AIzaSyCRXClXDDsIHf6d_3NmJ0IcH5jwePTNHLs');
var lwip = require('lwip');


var sourceimages = [
  {
    name: 'wb1.png',
    size: 24000
  },
  {
    name: 'wb2.png',
    size: 12000
  },
  {
    name: 'wb3png',
    size: 6000
  },
  {
    name: 'wb4.png',
    size: 6000
  },
  {
    name: 'wb5.png',
    size: 24000
  },
  {
    name: 'wb6.png',
    size: 12000
  },
  {
    name: 'wb7.png',
    size: 24000
  },
  {
    name: 'wb8.png',
    size: 48000
  }
];


// for (var z = 12; z <= 17; z++) {
//   var stream = gm()
//     .zoom(z)
//     .resolution('640x640')
//     .mapType('satellite')
//     .address('52.135840, 5.133708')
//     .markers([])
//     .staticMap()
//     .done();
//
//   stream.pipe(fs.createWriteStream('org' + z + '.png'));
//
// }

var imgTags = [];
var aImageTags = [];

function aiFileName(n, p) {
  var bn = 'wb' + n + '_' + p;
  var fn = bn + '.png';
  imgTags.push('<img id="' + bn + '" src="' + fn + '">');
  var h, w, x, z;
  switch (p) {
    case 'T':
      w = 512;
      h = 128;
      x = 0;
      z = -192;
      break;
    case 'L':
      w = 128;
      h = 256;
      x = -192;
      z = 0;
      break;
    case 'R':
      w = 128;
      h = 256;
      x = 192;
      z = 0;
      break;
    case 'B':
      w = 512;
      h = 128;
      x = 0;
      z = 192;
      break;
  }
  var m = 12000 / Math.pow(2, n - 12); // meters per volledige image
  w = w / 512 * m;
  h = h / 512 * m;
  x = x / 512 * m;
  z = z / 512 * m;
  var aImageTag = '<a-image src="#' + bn + '"  height="' + h + '" width="' + w + '" position="' + x + ' {{altitude+200}} ' + z + '" rotation="-90 {{angle}} 0"></a-image>';
  aImageTags.push(aImageTag);
  return fn;
}


async.eachSeries([12, 13, 14, 15, 16, 17], function (n, cbEach) {
    var filename = 'org' + n + '.png';
    lwip.open(filename, function (err, image) {
      image.crop(512, 512, function (err, image) {
        image.writeFile('wb' + n + '.png', function (err) {
          if (n < 17) {
            async.series([
              function (cb) {
                image.extract(0, 0, 511, 127, function (err, image) {
                  image.writeFile(aiFileName(n, 'T'), function () {
                    cb();
                  });
                })
              },
              function (cb) {
                image.extract(0, 128, 127, 383, function (err, image) {
                  image.writeFile(aiFileName(n, 'L'), function () {
                    cb();
                  });
                })
              },
              function (cb) {
                image.extract(384, 128, 511, 383, function (err, image) {
                  image.writeFile(aiFileName(n, 'R'), function () {
                    cb();
                  });
                })
              },
              function (cb) {
                image.extract(0, 384, 511, 511, function (err, image) {
                  image.writeFile(aiFileName(n, 'B'), function () {
                    cb();
                  });
                })
              }
            ]);
          }
          cbEach();
          return;
        });
      });
    });
  },
  function () {
    for (var ii = 0; ii<imgTags.length; ii++ ) {
      console.log(imgTags[ii]);
    }
    for (var ai = 0; ai<aImageTags.length; ai++ ) {
      console.log(aImageTags[ai]);
    }
  });