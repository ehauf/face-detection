<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">{{ message }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: string }>();
</script>
