import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#473472",
          secondary: "#10B981",
          accent: "#06B6D4",
          background: "#F9F8F6",
          surface: "#FFFFFF",
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: "lg" },
    VCard: { rounded: "lg" },
  },
});
