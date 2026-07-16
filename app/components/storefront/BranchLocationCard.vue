<template>
  <div class="app-card pa-4">
    <div class="d-flex align-start justify-space-between ga-2">
      <div class="min-width-0">
        <div class="text-subtitle-1 font-weight-bold text-truncate">{{ branch.name }}</div>
        <div class="d-flex align-start ga-1 text-body-2 text-medium-emphasis mt-1">
          <v-icon size="14" class="mt-1">mdi-map-marker-outline</v-icon>
          <span>{{ branch.addressLine1 }}, {{ branch.city }}</span>
        </div>
      </div>
      <v-chip v-if="branch.distanceKm !== null" size="small" color="primary" variant="tonal" class="flex-shrink-0">
        {{ branch.distanceKm }} km
      </v-chip>
    </div>

    <div class="d-flex flex-wrap align-center ga-2 mt-3">
      <v-chip v-if="open !== null" size="small" :color="open ? 'success' : 'error'" variant="tonal">
        <v-icon start size="14">{{ open ? 'mdi-clock-check-outline' : 'mdi-clock-outline' }}</v-icon>
        {{ open ? 'Open now' : 'Closed now' }}
      </v-chip>
      <v-chip v-if="branch.openingTime && branch.closingTime" size="small" variant="tonal">
        {{ branch.openingTime }} - {{ branch.closingTime }}
      </v-chip>
      <v-chip v-if="branch.pickupAvailable" size="small" color="success" variant="tonal">
        <v-icon start size="14">mdi-bag-checked</v-icon>
        Pickup available
      </v-chip>
    </div>

    <div class="d-flex flex-wrap ga-2 mt-4">
      <v-btn size="small" color="primary" :to="`/browse/${branch.id}`">View menu</v-btn>
      <v-btn size="small" variant="outlined" :href="directionsUrl" target="_blank" rel="noopener">
        <v-icon start size="16">mdi-map-marker-outline</v-icon>
        Directions
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TenantBranch } from '@/types/site'
import { isOpenNow } from '@/utils/businessHours'

const props = defineProps<{ branch: TenantBranch }>()

const open = computed(() => isOpenNow(props.branch.openingTime, props.branch.closingTime))

const directionsUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${props.branch.addressLine1}, ${props.branch.city}`)}`,
)
</script>

<style scoped>
.min-width-0 {
  min-width: 0;
}
</style>
