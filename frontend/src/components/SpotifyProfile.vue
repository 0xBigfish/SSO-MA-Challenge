<template>
  <div class="container">
    <div id="user-profile" v-if="profile">
      <h1>Logged in as {{ profile.display_name }}</h1>
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
    <div id="oauth">
      <h2>oAuth info</h2>
      <dl class="dl-horizontal">
        <dt>Access token</dt>
        <dd class="text-overflow">{{ accessToken }}</dd>
        <dt>Refresh token</dt>
        <dd class="text-overflow">{{ refreshToken }}</dd>
      </dl>
    </div>

    <button class="btn btn-primary" @click="fetchProfile">
      Request data from frontend
    </button>

    <button class="btn btn-default" @click="refreshAccessToken">
      Obtain new token using the refresh token
    </button>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    default: null
  }
});
</script>

<style scoped>
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
}

.container {
  margin-top: 20px;
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

</style>
