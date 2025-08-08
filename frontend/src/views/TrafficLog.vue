<template>
  <div>
    <h1>OAuth2 Traffic Log</h1>
    <div
        v-for="(log, i) in logs"
        :key="i"
        class="log-entry"
    >
      <div class="arrow">➡️</div>
      <div class="log-details">
        <div class="log-line">
          <strong>{{ log.source }}</strong> → <strong>{{ log.target }}</strong>
        </div>
        <small>{{ log.timestamp }}</small>
        <pre :class="getSourceClass(log.source)">
          {{ formatData(log.data) }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, onMounted} from 'vue';

  const logs = ref([]);

  function formatData(data) {
    return typeof data === 'object'
        ? JSON.stringify(data, null, 2)
        : String(data);
  }

  function getSourceClass(source) {
    const src = source?.trim().toLowerCase();
    if (src === 'idp') return 'idp';
    if (src === 'frontend') return 'frontend';
    if (src === 'backend') return 'backend';
    return 'unknown';
  }

  onMounted(async () => {
    const res = await fetch('http://localhost:3000/logs');
    logs.value = await res.json();
  });
</script>

<style scoped>
  .log-entry {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .arrow {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  .log-details {
    flex: 1;
  }

  .log-line {
    text-align: left;
  }

  pre {
    padding: 0.5rem;
    border-radius: 4px;
    white-space: pre-wrap;
    text-align: left;
    margin-top: 0.25rem;
  }

  /* Colors based on source */

  /* Frontend: green */
  pre.frontend {
    background: #0d2610; /* dark green */
    color: #00ff7f; /* bright green */
  }

  /* Backend: blue */
  pre.backend {
    background: #0d1a26; /* dark blue */
    color: #66ccff; /* light blue */
  }

  /* IdP: orange */
  pre.idp {
    background: #261a0d; /* dark orange-brown */
    color: #ffcc66; /* light orange */
  }

  /* Unknown/fallback: gray */
  pre.unknown {
    background: #2f2f2f;
    color: #ccc;
  }
</style>
