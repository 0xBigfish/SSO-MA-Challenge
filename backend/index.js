const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('querystring');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Replace with your IdP info
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/callback';
const TOKEN_ENDPOINT = 'https://your-idp.com/oauth/token';

app.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post(
            TOKEN_ENDPOINT,
            qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const tokens = response.data;
        res.send(`
      <h1>Access Token:</h1>
      <pre>${JSON.stringify(tokens, null, 2)}</pre>
    `);
    } catch (err) {
        console.error('Token exchange failed:', err.response?.data || err.message);
        res.status(500).send('Token exchange failed');
    }
});

app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});
