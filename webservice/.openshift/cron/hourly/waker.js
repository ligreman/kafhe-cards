#!/usr/bin/env node

'use strict';

var http = require('http');

var req = http.get('http://foroligre.net63.net/waker.php', function (response) {
    console.log("Respuesta obtenida");
    // handle the response
    var res_data = '';
    response.on('data', function (chunk) {
        res_data += chunk;
    });
    response.on('end', function () {
        console.log("HTTP OK");
        console.log(res_data);
    });
});
req.on('error', function (err) {
    console.log("Request error: " + err.message);
});
