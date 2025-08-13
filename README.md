# Spotify OAuth2 Flow Logger
This app offers the OAuth2 authorization-code flow for Spotify and logs all send and received messages between front-end, backend 
and the Identity Provider (IdP).

You can observe how the `access_token` and `refresh_token` change when requesting to refresh the tokens or starting 
the flow from scratch.
The app requests basic information from the user's spotify profile using the Spotify API.
The logging view gives detailed insight into the entirety of each request that has been sent and
received, while color coding the requests based on sender for easier distinction.

The app is intended for testing purposes and supposed to only be run locally. It only makes requests to itself and the Spotify APIs
`https://accounts.spotify.com/` and `https://api.spotify.com`

## Pre-setup
Before you can use the app you need to register an app on https://developer.spotify.com/dashboard. As of August 2025, 
a free account is sufficient to register an app with the required capabilities to run this app.  

After registration, copy the values of `Client ID` and `Client secret` which are needed for the next step

**Important**: You need to add `http://127.0.0.1:3000/auth-code/callback` to your registered app's 
`Redirect URIs`, otherwise the Spotify APIs will block the redirect to the backend in the initial request 
to the authorization endpoint and the SSO flow can not complete.

## Installation
1. Install node.js (https://nodejs.org/en/download)
2. Clone this repository
3. Navigate to the root of the repository and run the following list of commands, while replacing`your-client-id-here` and `your-client-secret-here` with your previously mentioned `Client ID` and `Client Secret`.
```
CLIENT_ID=your-client-id-here
CLIENT_SECRET=your-client-secret-here
``` 
and
```
touch backend/.env
echo "SPOTIFY_CLIENT_ID=$CLIENT_ID" >> backend/.env 
echo "SPOTIFY_CLIENT_SECRET=$CLIENT_SECRET" >> backend/.env 
#
npm install
#
echo "-----------------------------"
echo "Please check if the set values are correct:"
cat ./backend/.env
echo ""
```

## How to run
1. Start the server 
```
 npm run dev
```
2. Open your browser and visit http://127.0.0.1:3000/