<template>
  <h1>Hello from App.vue</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/views/Home">Go to About</RouterLink>
    <RouterLink to="/HelloWorld">HelloWorld</RouterLink>
    <RouterLink to="/Fetch">Fetch</RouterLink>
  </nav>
  <br>
  <par>The follow is shown depending on the URL</par>
  <hr>
  <main>
    <RouterView />
  </main>
</template>