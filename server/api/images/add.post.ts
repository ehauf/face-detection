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

  if (!body.file && !body.name) {
    return sendError(
      event,
      createError({ statusCode: 400, message: "Missing file or name" })
    );
  }

  const imageStore = await getUserImages(username);

  imageStore.push({
    id: body.id,
    name: body.name,
    file: body.file,
    progress: "enqueued",
    detectionCount: 0,
  });

  await saveUserImages(username, imageStore);

  return "success";
});
