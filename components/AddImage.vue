<template>
  <form
    class="shadow sm:overflow-hidden sm:rounded-md w-96 p-4 my-4"
    @submit.prevent="addImage"
  >
    <div class="w-full sm:max-w-xs my-4">
      <input
        ref="file"
        type="file"
        name="file"
        id="file"
        required
        class="block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div class="w-full sm:max-w-xs my-4">
      <label for="email" class="sr-only">Email</label>
      <input
        v-model="name"
        type="text"
        name="name"
        id="name"
        required
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Annotation*"
      />
    </div>
    <button
      type="submit"
      class="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
    >
      Add Image
    </button>
  </form>
</template>

<script setup lang="ts">
const file = ref<HTMLInputElement>();
const name = ref("");

const props = defineProps<{ names: string[] }>();

const emit = defineEmits<{
  (e: "addImage", file: File, name: string): void;
}>();

function addImage() {
  if (!file.value || !file.value.files || !file.value.files[0]) {
    return;
  }

  const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

  if (!allowedFileTypes.includes(file.value.files[0].type)) {
    alert("Only png, jpeg and gif files are allowed");
    return;
  }

  if (props.names.includes(name.value)) {
    alert(`Request with name "${name.value}" already exists`);
    return;
  }

  emit("addImage", file.value.files[0], name.value);

  file.value.value = "";
  name.value = "";
}
</script>
