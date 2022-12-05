<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              required
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>

      <Alert v-if="showErrorMsg" message="Login failed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: "login",
});

const username = ref("");
const showErrorMsg = ref(false);
const authToken = useAuthToken();

async function login() {
  const data = await $fetch("/api/login", {
    method: "POST",
    credentials: "include",
    body: { username: username.value },
  });

  if (!data.jwt) {
    showErrorMsg.value = true;
  }

  authToken.value = data.jwt;

  if (await isAuthenticated(data.jwt, "admin")) {
    await navigateTo("/summary");
  } else {
    await navigateTo("/dashboard");
  }
}
</script>
