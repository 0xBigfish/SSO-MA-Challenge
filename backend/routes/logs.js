const express = require('express');
const { getLogs, clearLogs, logTraffic } = require('../utils/trafficLogger');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(getLogs());
});

router.delete('/', (req, res) => {
    clearLogs();
    res.json({ message: 'Logs cleared' });
});

router.post('/', (req, res) => {
    logTraffic({
        source: req.body.source,
        target: req.body.target,
        direction: req.body.direction,
        data: {
            method: req.body.method,
            url: req.body.url,
            headers: req.body.headers,
            body: req.body.body || null
        }
    })
})

module.exports = router;
