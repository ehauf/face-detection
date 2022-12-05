<template>
  <Header title="Summary" />
  <div class="px-4 sm:px-6 lg:px-8">
    <div
      class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
    >
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Username
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Total number of image
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Total number of detections
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="user in users" :key="user.username">
            <td
              class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
            >
              {{ user.username }}
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              {{ user.imageCount }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              {{ user.totalDetections }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});

const { data: users } = await useFetch("/api/users", {
  headers: useRequestHeaders(["cookie"]) as Record<string, string>,
});
</script>
