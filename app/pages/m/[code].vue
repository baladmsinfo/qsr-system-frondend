<template>
  <v-container v-if="error" class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh">
    <v-icon size="64" color="grey">mdi-qrcode-remove</v-icon>
    <h2 class="text-h6 font-weight-bold mt-4">{{ error }}</h2>
    <p class="text-body-2 text-medium-emphasis">Please ask a staff member for help.</p>
  </v-container>

  <v-container v-else-if="loading" class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh">
    <v-progress-circular indeterminate color="primary" size="48" />
    <h2 class="text-h6 font-weight-bold mt-6">Loading the menu...</h2>
  </v-container>

  <div v-else>
    <div class="customer-hero pa-5 pb-6 text-white">
      <div class="d-flex align-center ga-2 mb-1" style="opacity: 0.85">
        <v-icon size="14" color="white">mdi-storefront-outline</v-icon>
        <span class="text-caption text-uppercase font-weight-medium" style="letter-spacing: 0.06em">{{ branch.company?.name }}</span>
      </div>
      <div class="d-flex align-center justify-space-between">
        <h1 class="text-h5 font-weight-bold mb-0">{{ branch.name }}</h1>
        <v-chip size="small" color="white" variant="flat" class="text-primary font-weight-bold">
          <v-icon start size="14">mdi-book-open-page-variant-outline</v-icon>Menu
        </v-chip>
      </div>
    </div>

    <v-container class="px-4 py-4">
      <v-alert type="info" variant="tonal" density="comfortable" class="mb-5">
        Browse the menu here, then place your order.
      </v-alert>

      <div v-if="menu.loading" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <template v-else>
        <div v-for="cat in menu.categories" :key="cat.id" class="mb-6">
          <template v-if="cat.menuItems?.length">
            <h3 class="text-subtitle-1 font-weight-bold mb-2">{{ cat.name }}</h3>
            <div class="app-card px-4">
              <MenuOnlyItemRow v-for="item in cat.menuItems" :key="item.id" :item="item" />
            </div>
          </template>

          <template v-for="sub in cat.subCategories || []" :key="sub.id">
            <template v-if="sub.menuItems?.length">
              <h4 class="text-subtitle-2 font-weight-bold mt-4 mb-2 text-secondary">{{ sub.name }}</h4>
              <div class="app-card px-4">
                <MenuOnlyItemRow v-for="item in sub.menuItems" :key="item.id" :item="item" />
              </div>
            </template>
          </template>
        </div>

        <div v-if="!menu.categories.length" class="text-center py-10">
          <v-icon size="48" color="secondary">mdi-silverware-clean</v-icon>
          <p class="text-medium-emphasis mt-3">No dishes on the menu yet</p>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { useSiteStore } from '@/stores/site'
import { useSiteService } from '@/services/siteService'

// Deliberately no 'table' middleware and no session.setFromQr() - this is a
// read-only menu card (scan -> browse -> tell the waiter), not a
// table/cart/checkout session like /t/:qrCode -> /menu.
definePageMeta({ layout: 'default' })

const route = useRoute()
const menu = useMenuStore()
const siteStore = useSiteStore()
const { $axios } = useNuxtApp()

const loading = ref(true)
const error = ref(null)
const branch = ref(null)

onMounted(async () => {
  try {
    const res = await $axios.get(`/api/public/menu-qr/${route.params.code}`)

    if (res.data.statusCode !== '00') {
      error.value = res.data.message || 'This menu QR code is not valid'
      return
    }

    branch.value = res.data.data
    await menu.fetchMenu(branch.value.id)

    // Best-effort: resolve the full storefront so navigating to "/" from this
    // read-only menu card shows the real store info instead of the generic
    // scan splash (this page never touches the session/table store).
    const tenantSlug = branch.value.company?.tenant
    if (tenantSlug) {
      try {
        const { fetchTenantSite } = useSiteService()
        const site = await fetchTenantSite(tenantSlug)
        siteStore.setResolved(tenantSlug, site)
      } catch {
        // Non-fatal - the menu card itself is still valid without this.
      }
    }
  } catch (err) {
    error.value = 'This menu could not be found'
  } finally {
    loading.value = false
  }
})
</script>
