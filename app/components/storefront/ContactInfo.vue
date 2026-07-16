<template>
  <div>
    <p v-if="!compact && site.description" class="text-body-1 mb-5">{{ site.description }}</p>

    <div v-if="!site.branches.length" class="text-body-2 text-medium-emphasis">
      No locations published yet.
    </div>

    <div v-else :class="compact ? 'contact-grid-compact' : 'contact-grid'">
      <div v-for="branch in site.branches" :key="branch.id" :class="compact ? 'd-flex align-center justify-space-between ga-3' : 'app-card pa-4'">
        <div class="text-start min-width-0">
          <div class="text-subtitle-2 font-weight-bold text-truncate">{{ branch.name }}</div>
          <div class="d-flex align-start ga-1 text-body-2 text-medium-emphasis mt-1">
            <v-icon size="14" class="mt-1">mdi-map-marker-outline</v-icon>
            <span>{{ branch.addressLine1 }}, {{ branch.city }}</span>
          </div>
          <div v-if="!compact && branch.openingTime && branch.closingTime" class="d-flex align-center ga-1 text-body-2 text-medium-emphasis mt-1">
            <v-icon size="14">mdi-clock-outline</v-icon>
            <span>{{ branch.openingTime }} - {{ branch.closingTime }}</span>
          </div>
        </div>
        <v-btn
          :size="compact ? 'small' : 'default'"
          :variant="compact ? 'text' : 'tonal'"
          color="primary"
          :class="compact ? '' : 'mt-3'"
          :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.addressLine1}, ${branch.city}`)}`"
          target="_blank"
          rel="noopener"
        >
          <v-icon start size="16">mdi-map-marker-outline</v-icon>
          Directions
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TenantSite } from '@/types/site'

withDefaults(defineProps<{ site: TenantSite; compact?: boolean }>(), { compact: false })
</script>

<style scoped>
.min-width-0 {
  min-width: 0;
}
.contact-grid-compact {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 900px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
