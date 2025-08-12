<script setup>
import router from "./router/index.js";
function showLogs() {
  router.push({path:'/logs'})
}
</script>

<template>
  <div><button @click="showLogs">Show Logs</button></div>
  <router-view/>
</template>

<style scoped>
</style>
