import { isAuthenticated } from "../utils/token";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = unref(useAuthToken());

  if (!(await isAuthenticated(token, "admin"))) {
    return navigateTo("/");
  }
});
