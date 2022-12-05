<template>
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
              Name
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Image
            </th>
            <th
              scope="col"
              class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Progress
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Number of Faces
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="image in images" :key="image.name">
            <td
              class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
            >
              {{ image.name }}
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              <img :src="image.file" class="w-32 h-32" />
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              <span
                v-if="image.progress === 'enqueued'"
                class="inline-flex rounded-full bg-grey-100 px-2 text-xs font-semibold leading-5 text-grey-800"
                >enqueued</span
              >
              <span
                v-if="image.progress === 'progress'"
                class="inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800"
                >progress</span
              >
              <span
                v-if="image.progress === 'ready'"
                class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                >ready</span
              >
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              {{ image.detectionCount }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AddImage @add-image="addImage" :names="names" />
  </div>
</template>

<script setup lang="ts">
type ImageDetection = {
  name: string;
  file: string;
  progress: "enqueued" | "progress" | "ready";
  detectionCount: number;
};

const { data: images } = await useFetch<ImageDetection[]>("/api/images", {
  headers: useRequestHeaders(["cookie"]) as any,
});

const names = computed(() => images.value?.map((image) => image.name) ?? []);

watch(
  images,
  (newImages) => {
    if (!newImages) {
      return;
    }

    const imagesInProgress = newImages.filter(
      (image) => image.progress === "progress"
    );

    if (imagesInProgress.length > 0) {
      const image = imagesInProgress[0];
      $fetch("/api/images/detect", {
        method: "POST",
        body: { name: image.name },
      }).then((detectionCount) => {
        image.progress = "ready";
        image.detectionCount = detectionCount;
      });
    }
  },
  { deep: true }
);

images.value
  ?.filter((image) => image.progress === "enqueued")
  .forEach((image) => {
    image.progress = "progress";
  });

async function addImage(image: File, name: string) {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const file: string = await new Promise((resolve) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });

  $fetch("/api/images/add", {
    method: "POST",
    body: JSON.stringify({
      name,
      file,
    }),
  }).then(() => {
    const image = images.value?.find((image) => image.name === name);

    if (image) {
      image.progress = "progress";
    }
  });

  if (!images.value) {
    images.value = [];
  }

  images.value.push({
    name,
    file,
    progress: "enqueued",
    detectionCount: 0,
  });
}
</script>
