import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

// "Coffee House" theme - a warm, elegant palette (coffee brown + brewed
// gold on cream) evoking traditional filter-coffee/tiffin houses, while
// keeping the app's single-brand QSR identity (no marketplace chrome).
export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#6B3A1A",
          "primary-darken-1": "#4A2712",
          "primary-lighten-1": "#8A4D22",
          secondary: "#C9962F",
          "secondary-darken-1": "#A97A22",
          accent: "#E0B354",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#B3261E",
          info: "#2563EB",
          background: "#FDF8EE",
          surface: "#FFFFFF",
          "surface-variant": "#F0E1C2",
          "on-surface-variant": "#6B5847",
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
