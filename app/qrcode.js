const qr = require('qr-image');
const fs = require('fs');
const util = require('util');
const uuid = require('uuid/v1');
var Promise = require('promise');

var _prefixFloder = "./public/";
var exports = module.exports = {};


function test() {
    console.log('test()');
}

exports.simpleGen = function (text, onFinish) {
    var body = {
        type: "text",
        data: {
            text: text
        }
    };

    var input = {
        body: body
    }

    var resultKey = this.generateQrcode(input, onFinish)
    return resultKey
}

exports.removeFile = function (keyName) {
    try {
        fs.unlinkSync(_prefixFloder + keyName)
        console.log("isExist : " +fs.existsSync(_prefixFloder + keyName))
    } catch (error) { }
}

exports.gen = function (req) {
    var body = {
        "type": req.body.type,
        "data": req.body.data
    }

    console.log('body : ' + JSON.stringify(body, null, 3))
    var str = '';
    if ("contact".toUpperCase() == body.type.toUpperCase()) {

        str = util.format('BEGIN:VCARD\nVERSION:3.0\nN:%s;%s\nEMAIL;TYPE=INTERNET:%s\nTEL:%s\nEND:VCARD',
            body.data.firstName,
            body.data.lastName,
            body.data.email,
            body.data.tel
        );

        //str = 'BEGIN:VCARD\nVERSION:3.0\nN:Tanawat;Watjanasoontorn\nEMAIL;TYPE=INTERNET:tanawat64@gmail.com\nTEL:0874905830\nEND:VCARD';
    }
    else if ("wifi".toUpperCase() == body.type.toUpperCase()) {
        str = util.format('WIFI:S:%s;T:WPA;P:%s;;',
            body.data.wifiName,
            body.data.wifiPassword
        )
    }
    else if ("tel".toUpperCase() == body.type.toUpperCase()) {
        str = util.format('TEL:%s',
            body.data.tel
        )
    }
    else {
        str = body.data.text;
    }

    var keyName = uuid() + '.png';
    var qrfilename = _prefixFloder + keyName; //i_love_qr.png';

    var ret = {
        keyName  : keyName,
        fileName : qrfilename
    }

    var qr_svg = qr.image(str, { type: 'png' });
    //var svg_string = qr.imageSync('I love QR!', { type: 'png' });
    return new Promise(function (resolve, reject) {
        qr_svg.pipe(fs.createWriteStream(qrfilename)).on('finish',
            function () {
                console.log('First Stage !!');
                resolve(ret);
            }
        );
        
    });

}

exports.generateQrcode = function (req, onFinish) {

    var body = {
        "type": req.body.type,
        "data": req.body.data
    }

    console.log('body : ' + JSON.stringify(body, null, 3))
    var str = '';
    if ("contact".toUpperCase() == body.type.toUpperCase()) {

        str = util.format('BEGIN:VCARD\nVERSION:3.0\nN:%s;%s\nEMAIL;TYPE=INTERNET:%s\nTEL:%s\nEND:VCARD',
            body.data.firstName,
            body.data.lastName,
            body.data.email,
            body.data.tel
        );

        //str = 'BEGIN:VCARD\nVERSION:3.0\nN:Tanawat;Watjanasoontorn\nEMAIL;TYPE=INTERNET:tanawat64@gmail.com\nTEL:0874905830\nEND:VCARD';
    }
    else if ("wifi".toUpperCase() == body.type.toUpperCase()) {
        str = util.format('WIFI:S:%s;T:WPA;P:%s;;',
            body.data.wifiName,
            body.data.wifiPassword
        )
    }
    else if ("tel".toUpperCase() == body.type.toUpperCase()) {
        str = util.format('TEL:%s',
            body.data.tel
        )
    }
    else {
        str = body.data.text;
    }

    var keyName = uuid() + '.png';
    var qrfilename = _prefixFloder + keyName; //i_love_qr.png';

    var qr_svg = qr.image(str, { type: 'png' });
    console.log('before write')
    qr_svg.pipe(fs.createWriteStream(qrfilename)).on('finish', onFinish);
    console.log('after write')
    //var svg_string = qr.imageSync('I love QR!', { type: 'png' });

    return keyName;
}

