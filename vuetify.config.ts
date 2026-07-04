import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

// "Heritage Modernist" theme - monochrome/grayscale palette matching the
// approved design reference (Hanken Grotesk, black primary, tonal greys).
export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#000000",
          "primary-darken-1": "#1C1B1B",
          secondary: "#424242",
          accent: "#424242",
          success: "#5E7355",
          warning: "#8A6D3B",
          error: "#B3261E",
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-variant": "#F0F0F0",
          "on-surface-variant": "#444444",
        },
      },
    },
  },
  defaults: {
    VBtn: { rounded: "pill", class: "text-none font-weight-medium" },
    VCard: { rounded: "lg" },
    VTextField: { variant: "outlined", density: "comfortable", color: "primary" },
    VTextarea: { variant: "outlined", density: "comfortable", color: "primary" },
    VChip: { rounded: "pill" },
  },
});
