<template>
  <div>
    <div class="customer-hero pa-5 pb-8 text-white">
      <div class="d-flex align-center ga-2 mb-1" style="opacity: 0.85">
        <v-icon size="14" color="white">mdi-map-marker-outline</v-icon>
        <span class="text-caption text-uppercase font-weight-medium" style="letter-spacing: 0.06em">Locations</span>
      </div>
      <h1 class="text-h5 font-weight-bold mb-0">{{ store.site?.name }}</h1>
    </div>

    <v-container class="px-4 py-6">
      <div class="d-flex justify-end mb-4">
        <v-btn size="small" variant="tonal" color="primary" :loading="locating" @click="useMyLocation">
          <v-icon start size="16">mdi-crosshairs-gps</v-icon>
          Sort by distance
        </v-btn>
      </div>

      <div v-if="!store.site?.branches.length" class="text-center text-medium-emphasis py-10">
        No locations published yet.
      </div>
      <div v-else class="locations-grid">
        <BranchLocationCard v-for="branch in store.site.branches" :key="branch.id" :branch="branch" />
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTenantSite } from '@/composables/useTenantSite'
import { useStorefrontSeo } from '@/composables/useStorefrontSeo'
import { useSiteService } from '@/services/siteService'
import BranchLocationCard from '@/components/storefront/BranchLocationCard.vue'

definePageMeta({ layout: 'default' })

const store = await useTenantSite()
useStorefrontSeo(() => store.site)

if (!store.site) {
  throw createError({ statusCode: 404, statusMessage: 'Restaurant not found' })
}

const locating = ref(false)

function useMyLocation() {
  if (!import.meta.client || !navigator.geolocation || !store.slug) return

  locating.value = true
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { fetchTenantSite } = useSiteService()
        const site = await fetchTenantSite(store.slug as string, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        store.setResolved(store.slug, site)
      } finally {
        locating.value = false
      }
    },
    () => {
      locating.value = false
    },
  )
}
</script>

<style scoped>
.locations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 900px) {
  .locations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

