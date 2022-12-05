export const useAuthToken = () => {
  const jwt = reactive(useCookie("jwt"));
  return jwt;
};
