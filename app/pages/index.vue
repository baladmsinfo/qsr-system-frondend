<template>
  <v-container class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh">
    <div class="splash-icon d-flex align-center justify-center mb-6">
      <v-icon size="40" color="white">mdi-qrcode-scan</v-icon>
    </div>
    <h2 class="text-h5 font-weight-bold mb-2">Scan to Order</h2>
    <p class="text-body-2 text-medium-emphasis mb-6" style="max-width: 320px">
      Scan the QR code on your table to view the menu and place your order.
    </p>

    <v-btn v-if="session.hasTable()" color="primary" size="large" @click="$router.push('/menu')">
      Continue to {{ session.branchName }}
    </v-btn>
  </v-container>
</template>

<style scoped>
.splash-icon {
  width: 88px;
  height: 88px;
  border-radius: 22px;
  background: linear-gradient(135deg, #4A3B78 0%, #362A5C 100%);
  box-shadow: 0 12px 28px -8px rgba(74, 59, 120, 0.35);
}
</style>

<script setup>
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'

definePageMeta({ layout: 'default' })

const session = useSessionStore()

onMounted(() => {
  session.restore()
})
</script>
