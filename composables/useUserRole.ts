import { decodeJwt, jwtVerify } from "jose";

export const useUserRole = async () => {
  const { value: jwt } = useCookie("jwt", { secure: true });

  const runtimeConfig = useRuntimeConfig();

  if (!jwt) {
    return false;
  }

  const payload = runtimeConfig.jwtSecret
    ? (await jwtVerify(jwt, new TextEncoder().encode(runtimeConfig.jwtSecret)))
        .payload
    : decodeJwt(jwt);

  if (!payload || !payload.username || !payload.role || !payload.exp) {
    return false;
  }

  if (payload.exp < Date.now() / 1000) {
    return false;
  }

  return payload.role as string;
};
