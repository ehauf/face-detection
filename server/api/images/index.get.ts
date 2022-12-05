import { getUsername } from "../../../utils/token";
import { getUserImages } from "../../../utils/userStore";

export default defineEventHandler(async (event) => {
  const { jwt } = parseCookies(event);

  const username = await getUsername(jwt);

  if (!username) {
    return sendError(
      event,
      createError({ statusCode: 401, message: "Unauthorized" })
    );
  }

  return getUserImages(username);
});
