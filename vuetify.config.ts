import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

// Same Bucksbox "Artisanal Operations" theme as the admin app, tuned for a
// mobile-first single-column ordering experience.
export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#4A3B78",
          "primary-darken-1": "#392C5E",
          secondary: "#6B6478",
          accent: "#7C6BA8",
          success: "#2E7D5B",
          warning: "#B8860B",
          error: "#B3261E",
          background: "#FAF9FC",
          surface: "#FFFFFF",
          "surface-variant": "#F3F1F8",
          "on-surface-variant": "#5B5566",
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: "lg", class: "text-none font-weight-medium" },
    VCard: { rounded: "lg" },
    VTextField: { variant: "outlined", density: "comfortable", color: "primary" },
    VTextarea: { variant: "outlined", density: "comfortable", color: "primary" },
    VChip: { rounded: "pill" },
  },
});
