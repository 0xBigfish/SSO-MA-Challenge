export async function logFrontendRequest(requestInfo) {
    try {
        await fetch('http://localhost:3000/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                source: requestInfo.source,
                target: requestInfo.target,
                direction: requestInfo.direction,
                data: {
                    method: requestInfo.method,
                    url: requestInfo.url,
                    headers: requestInfo.headers || {},
                    body: requestInfo.body || null
                }
            })
        });
    } catch (err) {
        console.warn('Failed to log frontend request', err);
    }
}

/**
 * Fetches the url and logs the request and response
 * @param url
 * @param options
 * @returns {Promise<Response>}
 */
export async function loggedFetch(url, options = {}) {
    // log the request
    console.log("Logged fetch", url, options);
    await logFrontendRequest({
        source: 'Frontend',
        target: new URL(url).hostname,
        direction: 'send',
        method: options.method,
        url,
        headers: options.headers,
        body: options.body,
    });

    const response = await fetch(url, options);
    console.log("Logged fetch", response);

    // try to parse the answer accordingly. A response is consumed even when parsing fails, so new clones are needed
    let responseBody = null;
    const jsonClone = response.clone();
    try {
        responseBody = await jsonClone.json();
    } catch {
        const textClone = response.clone();
        try {
            responseBody = await textClone.text();
        } catch {
            // fallback if even text reading fails
            responseBody = null;
        }
    }

    // log the response
    await logFrontendRequest({
        source: new URL(response.url).hostname,
        target: 'Frontend',
        direction: 'receive',
        method: options.method,
        url,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseBody,
    });

    return response;
}
