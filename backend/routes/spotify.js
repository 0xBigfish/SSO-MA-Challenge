const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/profile-data', (req, res) => {
    const access_token = req.cookies.access_token || null;

    if (access_token) {
        axios.get('https://api.spotify.com/v1/me',
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
            console.error("[spotify.js] " + err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;