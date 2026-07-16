<template>
  <div>
    <div class="customer-hero pa-5 pb-8 text-white">
      <div class="d-flex align-center ga-2 mb-1" style="opacity: 0.85">
        <v-icon size="14" color="white">mdi-information-outline</v-icon>
        <span class="text-caption text-uppercase font-weight-medium" style="letter-spacing: 0.06em">Contact</span>
      </div>
      <h1 class="text-h5 font-weight-bold mb-0">{{ store.site?.name }}</h1>
    </div>

    <v-container class="px-4 py-6">
      <ContactInfo v-if="store.site" :site="store.site" />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useTenantSite } from '@/composables/useTenantSite'
import { useStorefrontSeo } from '@/composables/useStorefrontSeo'
import ContactInfo from '@/components/storefront/ContactInfo.vue'

definePageMeta({ layout: 'default' })

const store = await useTenantSite()
useStorefrontSeo(() => store.site)

if (!store.site) {
  throw createError({ statusCode: 404, statusMessage: 'Restaurant not found' })
}
</script>
