<template>
  <div>
    <h1>OAuth2 Authorization Code Flow</h1>
    <button @click="startFlow">Start Flow</button>
  </div>
</template>

<script setup>
import { loggedFetch } from '../utils/logger';
function startFlow() {
  //   document.location = 'http://localhost:3000/auth-code';
  loggedFetch('http://localhost:3000/auth-code');
}
</script>
