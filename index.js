/*jslint node: true*/
"use strict";

/*
* ##########################################
* # LIBRARY IMPORTS                        #
* ##########################################
*/
var http  = require("http"),
    https = require("https"),
    route = require("./includes/route"),
    endpoint = require("./includes/endpoint");

var config = {
    port: 80,
    sslPort: 443
};

/*
* ##########################################
* # CORE SERVER                            #
* ##########################################
*/

// Starts the server on the specified port.
function server() {
    http.createServer(route.determine).listen(config.port);
    console.log("Started HTTP Server On " + config.port.toString());
}

function secureServer(options) {
    http.createServer(route.redirectSecure).listen(config.port);
    https.createServer(options, route.determine).listen(config.sslPort);
    console.log("Started HTTPS Server On " + config.sslPort.toString());
}

/*
* ##########################################
* # EXPORTS                                #
* ##########################################
*/
exports.config = config;

exports.get = endpoint.get;
exports.put = endpoint.put;
exports.post = endpoint.post;
exports.delete = endpoint.delete;
exports.respond = require("./includes/respond");
exports.database = require("./includes/database");
exports.server = server;
exports.secureServer = secureServer;
