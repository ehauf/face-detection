<template>
  <Header title="Dashboard" />
  <ImageList />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
