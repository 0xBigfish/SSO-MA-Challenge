<script setup>
import HelloWorld from './components/HelloWorld.vue'
import router from "./router/index.js";
function showLogs() {
  router.push({path:'/logs'})
}
</script>

<template>
  <div><button @click="showLogs">Show Logs</button></div>
  <div><strong>Warning: Starting any flow will clear the logs</strong></div>
  <router-view/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
