const {logTraffic} = require("./trafficLogger");


// logs all incoming and outgoing requests of the express framework
function unifiedLogger(req, res, next) {
    const startTime = Date.now();

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
                cookies: req.cookies,
                query: req.query,
                body: req.body,
                loggedBy: 'Centralized logging (express incoming requests)'
            }
        });


        // log outgoing requests, a bit more complicated
        // Keep reference to original res.send
        const originalSend = res.send.bind(res);
        res.send = function (body) {
            const ret = originalSend(body);
            logResponse(body);
            return ret;
        };

        // Keep reference to original res.send
        const originalRedirect = res.redirect.bind(res);
        res.redirect = function (...args) {
            const ret = originalRedirect(...args);
            logResponse({ redirectArgs: args });
            return ret;
        };

        next();
    } else {
        next();
    }
}

module.exports = unifiedLogger;