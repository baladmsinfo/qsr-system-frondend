<template>
  <div>
    <div class="customer-hero pa-4 pb-5 text-white d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="tonal" color="white" size="small" @click="$router.back()" />
      <h1 class="text-h5 font-weight-bold mb-0">Order History</h1>
    </div>

    <v-container>
      <div v-if="!order.history.length" class="text-center py-12">
        <v-icon size="64" color="grey">mdi-receipt-text-outline</v-icon>
        <p class="text-medium-emphasis mt-4">No past orders on this device</p>
      </div>

      <div
        v-for="entry in order.history"
        :key="entry.id"
        class="app-card mb-3 pa-3"
        style="cursor: pointer"
        @click="$router.push(`/order/${entry.id}`)"
      >
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="font-weight-bold">{{ entry.tableNo || 'Order' }}</div>
            <div class="text-caption text-medium-emphasis">{{ new Date(entry.createdAt).toLocaleString() }}</div>
          </div>
          <div class="font-weight-bold text-primary mono-data">{{ $formatPrice(entry.totalAmount) }}</div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'

definePageMeta({ layout: 'default' })

const order = useOrderStore()

onMounted(() => {
  order.restoreHistory()
})
</script>
