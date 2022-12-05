// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      content: ["pages/**/*.vue"],
      plugins: [require("@tailwindcss/forms")],
    },
  },
  runtimeConfig: {
    admin: "admin",
    jwtExpiration: "30m",
    jwtSecret: "secret",
  },
});
