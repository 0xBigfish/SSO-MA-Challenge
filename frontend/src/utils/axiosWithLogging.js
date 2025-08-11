import axios from 'axios';
import { BACKEND_BASE_URL } from '../config.js';

/**
 * Transform the absolute or relative URL from config into a URL object.
 * @param config axios config of the request
 * @returns the requested URL as URL object
 */
function getAsURLObject(config) {
    // If config.url is already absolute, return it as is
    try {
        return new URL(config.url);
    } catch {
        // Not an absolute URL, combine with baseURL (if set)
        return new URL((config.baseURL || '') + config.url);
    }
}

// the backends logging endpoint URL
const LOGGING_ENDPOINT_URL = BACKEND_BASE_URL + '/logs';

// create the axios instance
const axiosWithLogging = axios.create({
    // the backend base URL, can be overwritten by calling with an absolute URL like https://example.com
    baseURL: '/',
    // needed to log sessions and cookies
    withCredentials: true
});
// Request interceptor
axiosWithLogging.interceptors.request.use(async (config) => {
    const requestURL = getAsURLObject(config);

    if (requestURL.hostname === new URL(BACKEND_BASE_URL).hostname) {
        // prevent duplicates, since the backend logs incoming requests itself
        return config;
    }

    console.log("Logging request to " + requestURL + " ...");
    // Send request log to backend logging endpoint
    fetch(LOGGING_ENDPOINT_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            source: 'Frontend',
            target: requestURL.hostname || window.location.origin,
            direction: 'send',
            method: config.method.toUpperCase(),
            url: requestURL.href,
            headers: config.headers,
            params: config.params,
            body: config.data || null,
            loggedBy: 'Frontend central logging (axios outgoing request)'
        })
    }).catch(console.error);
    console.log(".. done logging request");

    return config;
});

// Response interceptor
axiosWithLogging.interceptors.response.use(async (response) => {
    const responseURL = getAsURLObject(response.config);

     if (responseURL.hostname === new URL(BACKEND_BASE_URL).hostname) {
         // prevent duplicates, since the backend logs incoming requests itself
        return response;
     }

    fetch(LOGGING_ENDPOINT_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            source: responseURL.hostname,
            target: 'Frontend',
            direction: 'receive',
            status: response.status,
            originally_requested: responseURL.href,
            headers: response.headers,
            body: response.data || null,
            loggedBy: 'Frontend central logging (axios incoming response)'
        })
    }).catch(console.error);

    return response;
});

export default axiosWithLogging;