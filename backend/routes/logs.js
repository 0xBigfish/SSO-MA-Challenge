const express = require('express');
const { getLogs, clearLogs } = require('../utils/trafficLogger');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(getLogs());
});

router.delete('/', (req, res) => {
    clearLogs();
    res.json({ message: 'Logs cleared' });
});

module.exports = router;
