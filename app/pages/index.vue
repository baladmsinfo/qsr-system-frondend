<template>
  <v-container class="d-flex flex-column align-center justify-center text-center" style="min-height: 100vh">
    <v-icon size="72" color="primary">mdi-qrcode-scan</v-icon>
    <h2 class="text-h5 font-weight-bold mt-6 mb-2">Scan to Order</h2>
    <p class="text-body-2 text-medium-emphasis mb-6" style="max-width: 320px">
      Scan the QR code on your table to view the menu and place your order.
    </p>

    <v-btn v-if="session.hasTable()" color="primary" size="large" @click="$router.push('/menu')">
      Continue to {{ session.branchName }}
    </v-btn>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'

definePageMeta({ layout: 'default' })

const session = useSessionStore()

onMounted(() => {
  session.restore()
})
</script>
