export type UserStore = {
  username: string;
  images: ImageStore[];
};

export type ImageStore = {
  id: string;
  name: string;
  file: string;
  progress: "enqueued" | "processing" | "ready";
  detectionCount: number;
};

export async function getUserImages(username: string) {
  const userStore: UserStore[] =
    (await useStorage().getItem("cache:images")) ?? [];

  const images =
    userStore.find((item) => item.username === username)?.images ?? [];

  return images;
}

export async function saveUserImages(username: string, images: ImageStore[]) {
  const userStore: UserStore[] =
    (await useStorage().getItem("cache:images")) ?? [];

  const index = userStore.findIndex((item) => item.username === username);

  if (index === -1) {
    userStore.push({ username, images });
  } else {
    userStore[index].images = images;
  }

  await useStorage().setItem("cache:images", userStore);
}

export async function getUserData() {
  const userStore: UserStore[] =
    (await useStorage().getItem("cache:images")) ?? [];

  return userStore.map((item) => ({
    username: item.username,
    imageCount: item.images.length,
    totalDetections: item.images
      .map((image) => image.detectionCount)
      .reduce((a, b) => a + b),
  }));
}
