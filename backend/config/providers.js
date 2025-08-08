module.exports = {
    spotify: {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        auth_url: 'https://accounts.spotify.com/authorize',
        token_url: 'https://accounts.spotify.com/api/token',
        redirect_uri: 'http://127.0.0.1:3000/auth-code/callback',
        scope: 'user-read-private user-read-email'
    }
    // Add more IDPs here if needed
};