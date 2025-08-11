const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const providers = require('../config/providers');
const state_utils = require('../utils/state');
const logger = require('../utils/trafficLogger');
const router = express.Router();
const provider = providers.spotify;

router.get('/profile-data', (req, res) => {
    const access_token = req.cookies.access_token || null;

    if (access_token) {
        jsonResponse = axios.get(
            'https://api.spotify.com/v1/me',
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                json: true
            }
        ).then((response) => {
            const data = response.data;
            res.send(data);
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;