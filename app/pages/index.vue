<template>
  <StorefrontHome v-if="site" :site="site" />

  <v-container v-else-if="session.hasTable()" class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh">
    <div class="splash-icon d-flex align-center justify-center mb-6">
      <v-icon size="40" color="white">mdi-storefront-outline</v-icon>
    </div>
    <span class="text-caption text-uppercase font-weight-bold text-primary mb-1" style="letter-spacing: 0.1em">
      {{ session.companyName }}
    </span>
    <h2 class="text-h5 font-weight-bold mb-2">Welcome to {{ session.branchName }}</h2>
    <p class="text-body-2 text-medium-emphasis mb-6" style="max-width: 320px">
      You're all set for table {{ session.tableNo }}. Continue to the menu to start your order.
    </p>

    <v-btn color="primary" size="large" @click="$router.push('/menu')">
      Continue to {{ session.branchName }}
    </v-btn>
  </v-container>

  <v-container v-else class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh">
    <div class="splash-icon d-flex align-center justify-center mb-6">
      <v-icon size="40" color="white">mdi-qrcode-scan</v-icon>
    </div>
    <h2 class="text-h5 font-weight-bold mb-2">Scan to Order</h2>
    <p class="text-body-2 text-medium-emphasis mb-6" style="max-width: 320px">
      Scan the QR code on your table to view the menu and place your order.
    </p>
  </v-container>
</template>

<style scoped>
.splash-icon {
  width: 88px;
  height: 88px;
  border-radius: 24px;
  background: linear-gradient(135deg, #4A2712, #6B3A1A);
  box-shadow: 0 12px 28px -8px rgba(255, 87, 34, 0.45);
}
</style>

<script setup>
import { onMounted, computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useTenantSite } from '@/composables/useTenantSite'
import { useStorefrontSeo } from '@/composables/useStorefrontSeo'
import StorefrontHome from '@/components/storefront/StorefrontHome.vue'

definePageMeta({ layout: 'default' })

const session = useSessionStore()
const siteStore = await useTenantSite()
const site = computed(() => siteStore.site)
useStorefrontSeo(() => site.value)

// A subdomain WAS given but didn't resolve to a real tenant - that's a wrong/
// stale link, not "no tenant at all" (the bare apex domain case), so it gets
// a proper 404 instead of silently falling back to the generic QR splash.
if (siteStore.notFound) {
  throw createError({ statusCode: 404, statusMessage: 'Restaurant not found' })
}

onMounted(() => {
  session.restore()
})
</script>
