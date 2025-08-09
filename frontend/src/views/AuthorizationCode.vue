<template>
  <div class="page-container">
    <h1>OAuth2 Authorization Code Flow</h1>
    <p>
      When running the flow in accordance with OAuth specification, the front-end starts the flow with a request to the
      backend and receives a <code>302</code> redirect with the client_secret and other needed parameters. The front-end then
      requests
      authentication from the IdP. This redirected request can not be logged, since <code>fetch()</code> handles these
      redirects internally. This way, the initial request and the response to and from the IdP can not be logged.
      You can view the requests from the front-end in a proxy, like BurpSuite.
    </p>
    <p>
      When running the flow with better logging, the initial request to the IdP is done by the backend. This is not
      according to the OAuth specification for the authorization code flow, but offers to log the entire flow with all
      requests.</p>
    <div class="button-wrapper">
      <button @click="startFrontendRedirect">
        Start Flow <br>
        (according OAuth to protocol) <br>
        <small>The redirected requests from frontend to IdP can not be logged</small>
      </button>
      <button @click="startBackendRedirect">
        Start Flow <br>
        (full logging)<br>
        <small>The full SSO dance is logged but not 100% conform with OAuth protocol</small>
      </button>
    </div>
  </div>
</template>

<script setup>
import {loggedFetch} from '../utils/logger';

function startFrontendRedirect() {
  document.location = 'http://localhost:3000/auth-code';
}

async function startBackendRedirect() {
  const res = await loggedFetch('http://localhost:3000/auth-code/backend-redirect', {
    redirect: 'manual'
  });

  const location = res.headers.get('Location');
  if (location) {
    window.location.href = location;
  } else {
    console.error('No redirect location found in response.');
  }
}
</script>
<style>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* center horizontally */
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
  font-size: 2rem;
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