<template>
  <div>
    <v-sheet color="primary" class="pa-4 text-white d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="$router.back()" />
      <h1 class="text-h6 font-weight-bold mb-0">Order History</h1>
    </v-sheet>

    <v-container>
      <div v-if="!order.history.length" class="text-center py-12">
        <v-icon size="64" color="grey">mdi-receipt-text-outline</v-icon>
        <p class="text-medium-emphasis mt-4">No past orders on this device</p>
      </div>

      <v-card
        v-for="entry in order.history"
        :key="entry.id"
        variant="flat"
        border
        class="mb-3 pa-3"
        @click="$router.push(`/order/${entry.id}`)"
      >
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="font-weight-bold">{{ entry.tableNo || 'Order' }}</div>
            <div class="text-caption text-medium-emphasis">{{ new Date(entry.createdAt).toLocaleString() }}</div>
          </div>
          <div class="font-weight-bold text-primary">{{ $formatPrice(entry.totalAmount) }}</div>
        </div>
      </v-card>
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
