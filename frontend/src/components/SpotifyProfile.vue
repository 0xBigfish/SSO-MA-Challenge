<template>
  <div class="container">
    <!-- Spotify user profile info -->
    <div id="user-profile" v-if="profile">
      <h1>Spotify: Logged in as {{ profile.display_name }}</h1>
      <div class="media">
        <div class="pull-left" v-if="profile.images && profile.images.length">
          <img class="media-object" width="150" :src="profile.images[0].url"/>
        </div>
        <div class="media-body">
          <ul class="profile-list">
            <li><span class="label">Display name:</span> {{ profile.display_name }}</li>
            <li><span class="label">Id:</span> {{ profile.id }}</li>
            <li><span class="label">Email:</span> {{ profile.email }}</li>
            <li>
              <span class="label">Spotify URI:</span>
              <a :href="profile.external_urls.spotify">{{ profile.external_urls.spotify }}</a>
            </li>
            <li>
              <span class="label">Link:</span>
              <a :href="profile.href">{{ profile.href }}</a>
            </li>
            <li v-if="profile.images.length">
              <span class="label">Profile Image:</span>
              <a :href="profile.images[0].url">{{ profile.images[0].url }}</a>
            </li>
            <li><span class="label">Country:</span> {{ profile.country }}</li>
          </ul>
        </div>
      </div>
    </div>


    <!-- OAuth info -->
    <div id="oauth" v-if="oAuthTokenData">
      <h2>OAuth info</h2>
      <ul class="token-list">
        <li>
          <span class="label">Access token:</span>
          <span class="token-value">{{ oAuthTokenData.access_token }}</span>
        </li>
        <li>
          <span class="label">Refresh token:</span>
          <span class="token-value">{{ oAuthTokenData.refresh_token }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    default: null
  },
  oAuthTokenData: {
    type: Object,
    default: null
  }
});
</script>

<style scoped>
.container {
  max-width: 100%; /* don’t grow beyond parent */
  overflow: hidden; /* hide content that still tries to push */
}

.profile-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-list li {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.profile-list .label {
  width: 150px; /* fixed width so values align */
  font-weight: bold;
}

.token-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.token-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  min-width: 0; /* 🔑 allows flex items to shrink inside container */
}

.token-list .token-value {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  white-space: normal;        /* allow wrapping */
  overflow-wrap: anywhere;    /* break anywhere in the token */
  word-break: break-all;      /* break inside long strings with no spaces */
  font-family: monospace;
  background: #0d1a26;
  color: #66ccff;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  box-sizing: border-box;
}


.token-list .label {
  width: 150px;  /* fixed width so values align */
  font-weight: bold;
  white-space: nowrap; /* prevent label from breaking */
  vertical-align: top;
}

</style>
