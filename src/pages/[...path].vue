<script setup lang="ts">
definePage({
  meta: { title: 'Not Found' },
})
</script>

<template>
  <div>
    <h1>404</h1>
    <p>Page not found.</p>
    <RouterLink to="/">Go home</RouterLink>
  </div>
</template>
