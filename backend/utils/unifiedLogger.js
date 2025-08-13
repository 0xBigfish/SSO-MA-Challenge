const {logTraffic} = require("./trafficLogger");


// logs all incoming and outgoing requests of the express framework
function unifiedLogger(req, res, next) {
    const startTime = Date.now();

    // Helper: parse JSON safely
    function safeJsonParse(str) {
        try {
            return JSON.parse(str);
        } catch {
            return str; // return as-is if it's not JSON
        }
    }

    const logResponse = (body) => {
        logTraffic({
            source: 'Backend',
            target: (req.ip === '::ffff:127.0.0.1' ? 'Frontend' : req.ip) || 'Unknown Client',
            direction: 'send',
            data: {
                status: res.statusCode,
                originally_requested: req.originalUrl,
                headers: res.getHeaders(),
                body,
                query: res.query,
                durationMs: Date.now() - startTime,
                loggedBy: 'Centralized logging (express outgoing requests)'
            }
        });

    };

    if (req.originalUrl !== '/logs' && req.originalUrl !== '/favicon.ico') {

        // log incoming requests
        logTraffic({
            source: (req.ip === '::ffff:127.0.0.1' ? 'Frontend' : req.ip) || 'Unknown Client',
            target: 'Backend',
            direction: 'receive',
            data: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                query: req.query,
                body: req.body,
                loggedBy: 'Centralized logging (express incoming requests)'
            }
        });


        // log outgoing requests, a bit more complicated
        // Keep reference to original res.send
        const originalSend = res.send.bind(res);
        res.send = function (body) {
            if (!res._loggedOnce) {
                res._loggedOnce = true; // mark as logged
                logResponse(
                    typeof body === 'string' ? safeJsonParse(body) : body
                );
            }
            return originalSend(body);
        };



        // Keep reference to original res.send
        const originalRedirect = res.redirect.bind(res);
        res.redirect = function (...args) {
            if (!res._loggedOnce) {
                res._loggedOnce = true;
                logResponse({ redirectArgs: args });
            }
            return originalRedirect(...args);
        };

        next();
    } else {
        next();
    }
}

module.exports = unifiedLogger;