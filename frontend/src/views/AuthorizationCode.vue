<template>
  <div class="page-container">
    <h1>OAuth2 Authorization Code Flow</h1>
    <p>
      The front-end starts the flow with a request to the
      backend and receives a <code>302</code> redirect to the IDP with the client_secret and other needed parameters.
      The front-end then requests authentication from the IdP.
      This redirected request can not be logged (via JavaScript), since the
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS">CORS policy</a> blocks this request.
      Instead, the request is done via <code>document.location</code> which allows the redirect to be properly done
      since this way it's not done by JavaScript and thereby unaffected by the policies.
      <b>The only way to log this request from the front end is by manually disabling the same origin policy
        and CORS policy in your browser.</b>
    </p>
    <div class="button-wrapper">
      <button @click="requestUserDataViaBackend">
        Start Flow <br>
        <small>Will log all traffic except the <code>302</code> from front-end to IdP</small>
      </button>
    </div>

    <!-- Include the Spotify View showing token data and user profile information -->
    <SpotifyProfile :profile="profileData" :oAuthTokenData="oAuthTokenData"/>

    <div class="button-wrapper" v-if="oAuthTokenData">
      <button class="btn btn-primary" @click="setProfileData">
        Request user profile data from backend
      </button>

      <button class="btn btn-default" @click="refreshTokens">
        Obtain new token using the refresh token
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {BACKEND_BASE_URL} from "../config.js";
import axiosWithLogging from '../utils/axiosWithLogging.js';
import SpotifyProfile from "../components/SpotifyProfile.vue";

// track the profile Data received from the backend in order to inject it into the Spotify component
let profileData = ref(null);
let oAuthTokenData = ref(null);

setTokenDataFromCookies();

function setProfileData() {
  const requestURL = BACKEND_BASE_URL + '/spotify/profile-data';

  console.log("setProfileData");
  // needs cookies, otherwise will return 401
  axiosWithLogging.get(requestURL, {
    withCredentials: true
  }).then((response) => {
    profileData.value = response.data;
  })
}

function setTokenDataFromCookies() {
  try {
    let cookies = {};
    let cookieName = "";
    let cookieValue = "";
    if (document.cookie.split(";").length > 1) {
      document.cookie.split(";").forEach(unparsedCookie => {
        console.log("unparsed cookie: " + unparsedCookie)
        cookieName = unparsedCookie.split("=")[0].trim();
        cookieValue = unparsedCookie.split("=")[1].trim();

        cookies[cookieName] = cookieValue;
        console.log(cookieName + ": " + cookieValue)
      });

      console.log("cookies: " + JSON.stringify(cookies));
      oAuthTokenData.value = cookies;
      console.log("oAuthTokenData: " + oAuthTokenData.value.refresh_token)
    }
  } catch (error) {
    console.error(error);
  }
}

function requestUserDataViaBackend() {
  const requestUrl = BACKEND_BASE_URL + '/auth-code';
  axiosWithLogging.get(requestUrl, {
    headers: {
      'X-Info': '####### The redirect to this request will most likely be blocked by CORS. If so, a second request will be send. #######'
    }
  }).catch(() => {
    // when CORS blocks the request abort logging and just redirect
    axiosWithLogging.get(BACKEND_BASE_URL + '/PREVIOUS-REQUEST-BLOCKED-BY-CORS', {})
        .catch(() => {
          document.location = requestUrl
        })
  });
}


function refreshTokens() {
  const requestUrl = BACKEND_BASE_URL + '/auth-code/refresh-tokens';
  axiosWithLogging.get(requestUrl, {
    withCredentials: true
  }).then((response) => {
    // request updates cookie values
    setTokenDataFromCookies();
  });
}

</script>
<style>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* center horizontally */
  justify-content: flex-start; /* top align */
  gap: 1.5rem;
  padding: 0 1.5rem;
  box-sizing: border-box;
  max-width: 700px; /* limit max width for readability */
  margin: 0 auto;
  text-align: left; /* make text inside left aligned */
}

.page-container h1 {
  width: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
}

.page-container p {
  width: 100%;
  line-height: 1.5;
  font-size: 1rem;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%; /* allow buttons to be centered horizontally */
}

.button-wrapper button {
  flex-shrink: 0; /* prevent buttons from shrinking */
  padding: 0.6rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  white-space: normal; /* allow wrapping inside buttons */
  max-width: 45%; /* prevent buttons from getting too wide */
  text-align: center;
}

.button-wrapper button small {
  font-size: 0.75rem;
  display: block;
  margin-top: 0.3rem;
}
</style>