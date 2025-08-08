const {logTraffic} = require("./trafficLogger");

// logs all incoming and outgoing requests of the express framework
function unifiedLogger(req, res, next) {
    const startTime = Date.now();

    console.log(`${req.method} ${req.originalUrl}`);
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
        const oldSend = res.send;

        res.send = function (body) {
            const duration = Date.now() - startTime;

            logTraffic({
                source: 'Backend',
                target: (req.ip === '::ffff:127.0.0.1' ? 'Frontend' : req.ip) || 'Unknown Client',
                direction: 'send',
                data: {
                    status: res.statusCode,
                    url: res.url,
                    headers: res.getHeaders(),
                    body: res.body,
                    query: res.query,
                    durationMs: duration,
                    loggedBy: 'Centralized logging (express outgoing requests)'
                }
            });

            return oldSend.apply(res, arguments);
        };

        next();
    } else {
        next();
    }
}

module.exports = unifiedLogger;