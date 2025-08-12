const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const providers = require('../config/providers');
const state_utils = require('../utils/state');
const logger = require('../utils/trafficLogger');
const router = express.Router();
const provider = providers.spotify;


// cookie options for this endpoint
const cookieOptions = {
    maxAge: 1000 * 60 * 15, // expires after 15 minutes
    secure: false, // localhost talks on http
    sameSite: 'strict', // frontend and backend on the same port
    httpOnly: false,
    path: "/" // set cookie for the whole domain
};


// exchange authorization code for access token
router.get('/', (req, res) => {

    const state = state_utils.generateRandomString(16);
    let authUrl = provider.auth_url + '?' +
        querystring.stringify({
            response_type: 'code',
            client_id: provider.client_id,
            redirect_uri: provider.redirect_uri,
            scope: provider.scope,
            state: state
        });


    res.redirect(authUrl);
});


// get authorization code
router.get('/callback', async (req, res, next) => {

    // TODO: add state check, the one from the spotify example repo is insecure in my opinion
    // https://github.com/spotify/web-api-examples/blob/master/authorization/authorization_code/app.js
    try {
        const {code, state} = req.query;

        const tokenResponse = await axios.post(
            provider.token_url,
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: provider.redirect_uri,
                client_id: provider.client_id,
                client_secret: provider.client_secret
            })
        );

        const access_token = tokenResponse.data.access_token || '';
        const refresh_token = tokenResponse.data.refresh_token || '';

        const requestBaseURL = req.get('origin') || req.get('referrer');

        res.cookie('access_token', access_token, cookieOptions);
        res.cookie('refresh_token', refresh_token, cookieOptions);

        res.redirect(requestBaseURL);
    } catch (err) {
        next(err);
    }
});


// use refresh token to get new access_token
router.get('/refresh-tokens', (req, res) => {
    const refresh_token = req.cookies.refresh_token || null;

    if (refresh_token) {
        axios.post(
            provider.refresh_token_url,
            querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: provider.client_id,
                client_secret: provider.client_secret
            })
        ).then(response => {
            // response.data: {
            //   access_token: BQCW[...]
            //   token_type: "Bearer"
            //   expires_in: 3600
            //   scope: "user-read-private [...]"
            // }
            res.cookie('access_token', response.data.access_token, cookieOptions);
            res.sendStatus(200);
        }).catch(error => {
            console.error("[auth-code] refresh tokens error", error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;
