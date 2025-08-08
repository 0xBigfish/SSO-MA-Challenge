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
    var scope = 'user-read-private user-read-email';
    res.redirect(
        provider.auth_url + '?' +
        querystring.stringify({
            response_type: 'code',
            client_id: provider.client_id,
            redirect_uri: provider.redirect_uri,
            scope: scope,
            state: state
        })
    );
});


// get authorization code
router.get('/callback', async (req, res, next) => {
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
                    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
                }}
        );
        res.json(tokenResponse.data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
