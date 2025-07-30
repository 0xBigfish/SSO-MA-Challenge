<template>
  <div>
    <h2>Fetched JSON Data</h2>
    <!-- shows html based on the variable state. Updates the state when on of the tracked variables is updated or changed -->
    <div v-if="loading">Loading...</div>
    <pre v-else-if="data">{{ data }}</pre>
    <div v-else>Error fetching data.</div>
  </div>
</template>

<!-- script setup saves boilerplate code, otherwise a setup() function is needed and functinos and vars need
to be explicitly returned in order to be usable by other components-->
<script setup>
import { ref, onMounted } from 'vue'

// ref enable tracking of variables. Vue can then react to their changes
const data = ref(null)
const loading = ref(true)

// onMount triggers when the component is loaded. Maybe a bit like a main() method for each component?
onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const json = await res.json()
    data.value = JSON.stringify(json, null, 2)
  } catch (e) {
    console.error('Error fetching:', e)
  } finally {
    loading.value = false
  }
})
</script>
