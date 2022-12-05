import { SignJWT } from "jose";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { username } = await readBody(event);

  if (!username) {
    return createError({ statusCode: 400, message: "Missing username" });
  }

  const jwt = await new SignJWT({
    username,
    role: username === config.admin ? "admin" : "user",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(config.jwtExpiration)
    .sign(new TextEncoder().encode(config.jwtSecret));
  return { jwt };
});
