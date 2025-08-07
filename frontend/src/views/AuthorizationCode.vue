<template>
  <div>
    <h1>OAuth2 Authorization Code Flow</h1>
    <button @click="startFlow">Start Flow</button>
  </div>
</template>

<script setup>
//TODO: introduce variables and environment variables to load the correct URL and client id
function startFlow() {
  const url = new URL('https://your-idp.com/oauth/authorize');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', 'your-client-id');
  url.searchParams.set('redirect_uri', 'http://localhost:3000/callback'); // redirect to backend
  url.searchParams.set('scope', 'openid profile email');
  url.searchParams.set('state', crypto.randomUUID());
  window.location.href = url.toString();
}
</script>
