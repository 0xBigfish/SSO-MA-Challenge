const logs = []; // Will store all traffic entries

function logTraffic({ source, target, direction, data }) {
    logs.push({
        timestamp: new Date().toISOString(),
        source: source || null,        // "Frontend", "Backend", "IdP"
        target: target || null,        // "Frontend", "Backend", "IdP"
        direction: direction || null,  // "send" or "receive"
        data: data || null             // Actual payload or URL
    });
}

function getLogs() {
    return logs;
}

function clearLogs() {
    logs.length = 0;
}

module.exports = { logTraffic, getLogs, clearLogs };
