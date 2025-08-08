const logs = []; // Will store all traffic entries

function logTraffic({ source, target, direction, data }) {
    logs.push({
        timestamp: new Date().toISOString(),
        source,     // "Frontend", "Backend", "IdP"
        target,     // "Frontend", "Backend", "IdP"
        direction,  // "send" or "receive"
        data        // Actual payload or URL
    });
}

function getLogs() {
    return logs;
}

function clearLogs() {
    logs.length = 0;
}

module.exports = { logTraffic, getLogs, clearLogs };
