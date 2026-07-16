<template>
  <div v-if="tags.length" class="d-flex flex-wrap ga-2" role="list" aria-label="Cuisine tags">
    <v-chip v-for="tag in tags" :key="tag" size="small" color="secondary" variant="tonal" role="listitem">
      {{ tag }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
defineProps<{ tags: string[] }>()
</script>
