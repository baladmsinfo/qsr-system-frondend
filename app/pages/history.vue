<template>
  <div>
    <div class="customer-hero pa-4 pb-5 text-white d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="tonal" color="white" size="small" @click="$router.back()" />
      <h1 class="text-h5 font-weight-bold mb-0">Order History</h1>
    </div>

    <v-container>
      <div v-if="!order.history.length" class="text-center py-12">
        <div class="empty-icon-badge mx-auto mb-4">
          <v-icon size="40" color="primary">mdi-receipt-text-outline</v-icon>
        </div>
        <p class="text-medium-emphasis">No past orders on this device</p>
        <v-btn color="primary" class="mt-2" @click="$router.push('/menu')">Browse Menu</v-btn>
      </div>

      <div
        v-for="entry in order.history"
        :key="entry.id"
        class="app-card mb-3 pa-3 d-flex align-center ga-3 history-row"
        @click="$router.push(`/order/${entry.id}`)"
      >
        <div class="history-icon">
          <v-icon color="primary" size="22">mdi-receipt-text-outline</v-icon>
        </div>
        <div class="flex-grow-1">
          <div class="font-weight-bold">{{ entry.tableNo || 'Order' }}</div>
          <div class="text-caption text-medium-emphasis">{{ new Date(entry.createdAt).toLocaleString() }}</div>
        </div>
        <div class="text-end">
          <div class="font-weight-bold text-primary mono-data">{{ $formatPrice(entry.totalAmount) }}</div>
          <v-icon size="16" color="grey">mdi-chevron-right</v-icon>
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

<style scoped>
.empty-icon-badge {
  width: 88px;
  height: 88px;
  border-radius: 24px;
  background: linear-gradient(135deg, #FFE5D5, #FDECC8);
  display: flex;
  align-items: center;
  justify-content: center;
}
.history-row {
  cursor: pointer;
}
.history-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #FFF3EC;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>
