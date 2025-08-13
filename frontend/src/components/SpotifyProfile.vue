<template>
  <div class="container">
    <!-- Spotify user profile info -->
    <div id="user-profile" v-if="profile">
      <h2>Spotify: Logged in as {{ profile.display_name }}</h2>
      <div class="profile-wrapper">
        <div v-if="profile.images && profile.images.length" class="profile-image">
          <img :src="profile.images[0].url" alt="Profile image" />
        </div>
        <table class="profile-table">
          <tbody>
          <tr>
            <th>Display name:</th>
            <td>{{ profile.display_name }}</td>
          </tr>
          <tr>
            <th>Id:</th>
            <td>{{ profile.id }}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{{ profile.email }}</td>
          </tr>
          <tr>
            <th>Spotify URI:</th>
            <td>
              <a :href="profile.external_urls.spotify" target="_blank" rel="noopener">
                {{ profile.external_urls.spotify }}
              </a>
            </td>
          </tr>
          <tr>
            <th>Link:</th>
            <td>
              <a :href="profile.href" target="_blank" rel="noopener">
                {{ profile.href }}
              </a>
            </td>
          </tr>
          <tr v-if="profile.images.length">
            <th>Profile Image URL:</th>
            <td>
              <a :href="profile.images[0].url" target="_blank" rel="noopener">
                {{ profile.images[0].url }}
              </a>
            </td>
          </tr>
          <tr>
            <th>Country:</th>
            <td>{{ profile.country }}</td>
          </tr>
          </tbody>
        </table>
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
}

.profile-wrapper {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}

.profile-image img {
  border-radius: 8px;
  max-width: 150px;
  height: auto;
  display: block;
}

/* Table styles */
.profile-table {
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
  text-align: left;
  font-size: 1rem;
  color: #ccc;
}

.profile-table th,
.profile-table td {
  padding: 0.5rem 1rem;
  border: 1px solid #444;
  vertical-align: top;
}

.profile-table th {
  background-color: #1a1a1a;
  font-weight: 600;
  width: 180px;
}

.profile-table td a {
  color: #66ccff;
  word-break: break-word;
  text-decoration: underline;
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
  min-width: 0; /* allows flex items to shrink inside container */
}

.token-list .label {
  width: 150px;  /* fixed width so values align */
  font-weight: bold;
  white-space: nowrap; /* prevent label from breaking */
  vertical-align: top;
  color: #ccc;
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

/* Light mode overrides */
@media (prefers-color-scheme: light) {
  .profile-table {
    color: #2d3748;
    border-color: #cbd5e0;
  }
  .profile-table th {
    background-color: #e2e8f0;
  }
  .profile-table td a {
    color: #3182ce;
  }

  .token-list .label {
    color: #4a5568; /* gray-600 */
  }

  .token-list li {
    color: #2d3748; /* dark gray */
  }

  .token-list .token-value {
    background: #f0f4f8;  /* very light blue */
    color: #2b6cb0;       /* blue-700 */
  }
}

</style>
