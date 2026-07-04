// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  // Customer app is a pure client-side ordering experience - no SSR needed
  ssr: false,

  app: {
    head: {
      title: "Order Online",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      meta: [
        { name: "theme-color", content: "#000000" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
      ],
    },
  },

  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  css: [],
  modules: ["@nuxt/fonts", "@pinia/nuxt", "vuetify-nuxt-module"],

  fonts: {
    families: [
      { name: "Hanken Grotesk", provider: "google", weights: [400, 500, 600, 700] },
    ],
  },

  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,
      },
      vuetifyOptions: "./vuetify.config.ts",
      styles: {
        configFile: "assets/settings.scss",
      },
    },
  },
});
