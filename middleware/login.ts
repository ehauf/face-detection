import { isAuthenticated } from "../utils/token";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authToken = useAuthToken();

  if (await isAuthenticated(authToken.value, "admin")) {
    navigateTo("/summary");
  } else if (await isAuthenticated(authToken.value)) {
    navigateTo("/dashboard");
  }
});
