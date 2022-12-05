<template>
  <header class="bg-indigo-600">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div
        class="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none"
      >
        <div class="flex items-center text-base font-medium text-white">
          {{ title }}
        </div>
        <div class="ml-10 space-x-4">
          <a
            @click.prevent="logout"
            href="/"
            class="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >Logout</a
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();

const logout = () => {
  useAuthToken().value = null;
  navigateTo("/");
};
</script>
