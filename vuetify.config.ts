import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

// "Fresh Table" theme - a warm, colorful, appetite-inducing palette in the
// spirit of modern quick-commerce apps (Swiggy/Zomato/Instamart), while
// keeping the app's single-brand QSR identity (no marketplace chrome).
export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#5B21B6",
          "primary-darken-1": "#471b8f",
          "primary-lighten-1": "#6825d2",
          secondary: "#00A86B",
          "secondary-darken-1": "#00875A",
          accent: "#e3a7fb",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#E11D48",
          info: "#2563EB",
          background: "#FFF8F3",
          surface: "#FFFFFF",
          "surface-variant": "#FFEDE0",
          "on-surface-variant": "#8A5A3B",
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: "pill", class: "text-none font-weight-bold" },
    VCard: { rounded: "xl" },
    VTextField: { variant: "outlined", density: "comfortable", color: "primary", rounded: "lg" },
    VTextarea: { variant: "outlined", density: "comfortable", color: "primary", rounded: "lg" },
    VChip: { rounded: "pill" },
  },
});
