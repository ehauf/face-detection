import { isAuthenticated } from "../../utils/token";
import { getUserData } from "../../utils/userStore";

export default defineEventHandler(async (event) => {
  const { jwt } = parseCookies(event);

  const isAdmin = await isAuthenticated(jwt, "admin");

  if (!isAdmin) {
    return sendError(
      event,
      createError({ statusCode: 401, message: "Unauthorized" })
    );
  }

  return getUserData();
});
