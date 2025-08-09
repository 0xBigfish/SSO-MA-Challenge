const axios = require('axios');
const { logTraffic } = require('./trafficLogger');

axios.interceptors.request.use(config => {
    // url is just /endpoint, baseURL is just https://my.domain.com
    const url = new URL(config.url, config.baseURL);
    logTraffic({
        source: 'Backend',
        direction: 'send',
        target: url.hostname,
        data: {
            method: config.method,
            url: url.href,
            headers: config.headers, // cookies are included here
            params: config.params,
            body: config.data,
            loggedBy: 'Centralized logging (axios outgoing requests)'
        }
    });
    return config;
});

axios.interceptors.response.use(response => {
    const url = new URL(response.config.url, response.config.baseURL);
    logTraffic({
        source: url.hostname,
        target: 'Backend',
        direction: 'receive',
        data: {
            status: response.status,
            originally_requested: url.href,
            headers: response.headers,
            body: response.data,
            loggedBy: 'Centralized logging (axios incoming responses)'
        }
    });
    return response;
});
