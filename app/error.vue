<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh">
      <v-container class="text-center">
        <v-icon size="64" color="grey">mdi-emoticon-sad-outline</v-icon>
        <h2 class="text-h5 font-weight-bold mt-4 mb-2">{{ error?.statusCode }}</h2>
        <p class="text-body-2 text-medium-emphasis mb-6">{{ error?.statusMessage || "Something went wrong" }}</p>
        <v-btn color="primary" @click="handleError">Go Back</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>
