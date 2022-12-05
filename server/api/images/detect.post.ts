import { detectFaces } from "../../../utils/detectFaces";
import { getUsername } from "../../../utils/token";
import { getUserImages, saveUserImages } from "../../../utils/userStore";

export default defineEventHandler(async (event) => {
  const { jwt } = parseCookies(event);

  const username = await getUsername(jwt);

  if (!username) {
    return sendError(
      event,
      createError({ statusCode: 401, message: "Unauthorized" })
    );
  }

  const body = await readBody(event);

  if (!body.name) {
    return sendError(
      event,
      createError({ statusCode: 400, message: "Missing name" })
    );
  }

  const imageStore = await getUserImages(username);
  const image = imageStore.find((image) => image.name === body.name);

  if (!image) {
    return sendError(
      event,
      createError({ statusCode: 404, message: "Image not found" })
    );
  }

  try {
    const result = await detectFaces(image.file);

    await saveUserImages(username, [
      ...imageStore.filter((image) => image.name !== body.name),
      {
        ...image,
        detectionCount: result,
        progress: "ready",
      },
    ]);

    return result;
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, message: "Error detecting faces" })
    );
  }
});
