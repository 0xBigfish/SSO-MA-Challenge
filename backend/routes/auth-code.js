const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const providers = require('../config/providers');
const state_utils = require('../utils/state');
const router = express.Router();
const provider = providers.spotify;

// exchange authorization code for access token
router.get('/', (req, res) => {
    const state = state_utils.generateRandomString(16);
    res.redirect(
        provider.auth_url + '?' +
        querystring.stringify({
            response_type: 'code',
            client_id: provider.client_id,
            redirect_uri: provider.redirect_uri,
            scope: provider.scope,
            state: state
        })
    );
});


// get authorization code
router.get('/callback', async (req, res, next) => {

    // TODO: add state check, the one from the spotify example repo is insecure in my opinion
    // https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code/app.js
    try {
        const { code, state } = req.query;
        const tokenResponse = await axios.post(
            provider.token_url,
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: provider.redirect_uri,
                client_id: provider.client_id,
                client_secret: provider.client_secret
            }),
            { headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(provider.client_id + ':' + provider.client_secret).toString('base64'))
                }}
        );
        res.json(tokenResponse.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
