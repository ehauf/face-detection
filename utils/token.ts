import { decodeJwt, jwtVerify } from "jose";

export async function isAuthenticated(jwt: string | null, role?: string) {
  const runtimeConfig = useRuntimeConfig();

  if (!jwt) {
    return false;
  }

  try {
    const payload = runtimeConfig.jwtSecret
      ? (
          await jwtVerify(
            jwt,
            new TextEncoder().encode(runtimeConfig.jwtSecret)
          )
        ).payload
      : decodeJwt(jwt);

    if (!payload || !payload.username || !payload.role || !payload.exp) {
      return false;
    }

    if (payload.exp >= Date.now()) {
      return false;
    }

    if (role && payload.role !== role) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function getUsername(jwt: string) {
  const runtimeConfig = useRuntimeConfig();

  if (!jwt) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(runtimeConfig.jwtSecret)
    );

    return payload.username as string;
  } catch (error) {
    return false;
  }
}
