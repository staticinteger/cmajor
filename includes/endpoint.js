var sutil        = require("./serverUtils"),
    route        = require("./route"),
    events       = require("events"),
    file         = require("./file"),
    eventEmitter = new events.EventEmitter();

function push(request, response) {
    "use strict";

    request.urlData = sutil.routeData(request);
    eventEmitter.emit(sutil.fullRequest(request), request, response);

    if (!eventEmitter.listeners(sutil.fullRequest(request))[0]) {
        request.url = "/index.html";

        file.push(request, response);
    }
}

/*
* ##########################################
* # API REQUEST HANDLERS                   #
* ##########################################
*/

// Listens for RESTful API GET requests.
function get(path, callback) {
    "use strict";

    eventEmitter.on(
        "GET@" + route.base(path),
        function (request, response) {
            callback(request, response);
        }
    );
}

// Listens for RESTful API PUT requests.
function put(path, callback) {
    "use strict";

    eventEmitter.on(
        "PUT@" + route.base(path),
        function (request, response) {
            request.on("data", function (chunk) {
                request.post = chunk.toString();
                callback(request, response);
            });
        }
    );
}

// Listens for RESTful API POST requests.
function post(path, callback) {
    "use strict";

    eventEmitter.on(
        "POST@" + route.base(path),
        function (request, response) {
            request.on("data", function (chunk) {
                request.post = chunk.toString();
                callback(request, response);
            });
        }
    );
}

// Listens for RESTful API DELETE requests.
function del(path, callback) {
    "use strict";

    eventEmitter.on(
        "DELETE@" + route.base(path),
        function (request, response) {
            request.on("data", function (chunk) {
                request.post = chunk.toString();
                callback(request, response);
            });
        }
    );
}

exports.push = push;
exports.get = get;
exports.put = put;
exports.post = post;
exports.delete = del;
