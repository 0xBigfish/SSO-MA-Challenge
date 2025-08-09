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
</style>
