// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  // Hybrid rendering: the storefront routes (tenant marketing pages, resolved
  // by subdomain) need real SSR for SEO/crawlability, so SSR is on by default
  // here and turned back off per-route below for the QR/table ordering flow,
  // which never needed it and stays a pure client-side SPA exactly as before.
  ssr: true,

  routeRules: {
    '/menu': { ssr: false },
    '/cart': { ssr: false },
    '/checkout': { ssr: false },
    '/history': { ssr: false },
    '/item/**': { ssr: false },
    '/order/**': { ssr: false },
    '/t/**': { ssr: false },
    '/m/**': { ssr: false },
    // Storefront routes: short stale-while-revalidate cache so admin edits to
    // company/branch data show up within ~60s without needing a redeploy.
    // `varies: ['host']` is required here - without it Nitro's cache key
    // ignores the Host header, so one tenant's subdomain could be served
    // another tenant's cached page.
    '/': { cache: { swr: true, maxAge: 60, varies: ['host'] } },
    '/locations': { cache: { swr: true, maxAge: 60, varies: ['host'] } },
    '/contact': { cache: { swr: true, maxAge: 60, varies: ['host'] } },
    '/browse/**': { cache: { swr: true, maxAge: 60, varies: ['host'] } },
  },

  app: {
    head: {
      title: "Order Online",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      meta: [
        { name: "theme-color", content: "#6B3A1A" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
      ],
    },
  },

  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.NUXT_PUBLIC_API_URL,
      // Apex/root domain this app is deployed under (e.g. "orders.example.com").
      // Tenant storefronts live at "<tenantSlug>.<apexDomain>". Left unset in
      // local dev, where "<slug>.localhost" is used instead (see utils/tenantHost.ts).
      apexDomain: process.env.NUXT_PUBLIC_APEX_DOMAIN || "",
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
      { name: "Playfair Display", provider: "google", weights: [600, 700, 800] },
      { name: "Poppins", provider: "google", weights: [300, 400, 500, 600, 700] },
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
