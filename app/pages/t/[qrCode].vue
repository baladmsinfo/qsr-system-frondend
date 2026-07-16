<template>
  <v-container class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh">
    <template v-if="error">
      <v-icon size="64" color="grey">mdi-qrcode-remove</v-icon>
      <h2 class="text-h6 font-weight-bold mt-4">{{ error }}</h2>
      <p class="text-body-2 text-medium-emphasis">Please ask a staff member for help.</p>
    </template>
    <template v-else>
      <v-progress-circular indeterminate color="primary" size="48" />
      <h2 class="text-h6 font-weight-bold mt-6">Welcome{{ session.branchName ? ` to ${session.branchName}` : '' }}</h2>
      <p class="text-body-2 text-medium-emphasis">Loading the menu for your table...</p>
    </template>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useSiteStore } from '@/stores/site'
import { useSiteService } from '@/services/siteService'

definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()
const session = useSessionStore()
const siteStore = useSiteStore()
const { $axios } = useNuxtApp()

const error = ref(null)

onMounted(async () => {
  try {
    const res = await $axios.get(`/api/public/qr/${route.params.qrCode}`)

    if (res.data.statusCode !== '00') {
      error.value = res.data.message || 'This QR code is not valid'
      return
    }

    const table = res.data.data
    if (!table.branch.acceptOrders || !table.branch.isOnline) {
      error.value = `${table.branch.name} is not accepting orders right now`
      return
    }

    session.setFromQr(table)

    // Best-effort: also resolve the full storefront (logo, description, all
    // branches) so that navigating back to "/" during this session shows the
    // real store info instead of the generic "Scan to Order" splash. A QR
    // scan never goes through the tenant subdomain, so without this the site
    // store would otherwise stay empty for the whole ordering session.
    if (session.tenantSlug) {
      try {
        const { fetchTenantSite } = useSiteService()
        const site = await fetchTenantSite(session.tenantSlug)
        siteStore.setResolved(session.tenantSlug, site)
      } catch {
        // Non-fatal - the table session itself is still valid without this.
      }
    }

    setTimeout(() => router.replace('/menu'), 600)
  } catch (err) {
    error.value = 'This QR code could not be found'
  }
})
</script>
