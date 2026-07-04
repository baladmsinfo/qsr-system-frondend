<template>
  <div>
    <div class="customer-hero pa-4 pb-5 text-white">
      <h1 class="text-h5 font-weight-bold mb-0">Order Status</h1>
      <div class="text-caption mono-data" style="opacity: 0.85">Token #{{ orderId.slice(0, 8) }}</div>
    </div>

    <v-container v-if="order.currentOrder">
      <div class="app-card pa-4 mb-4">
        <OrderStatusStepper :status="order.currentOrder.status" />
      </div>

      <div class="app-card pa-4 mb-4">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">Order Summary</h3>
        <div v-for="item in order.currentOrder.orderItems" :key="item.id" class="d-flex justify-space-between text-body-2 mb-1">
          <span>{{ item.quantity }} &times; {{ item.menuItem?.name }}</span>
          <span class="mono-data">{{ $formatPrice(item.total) }}</span>
        </div>
        <v-divider class="my-2" />
        <div class="d-flex justify-space-between font-weight-bold">
          <span>Total</span><span class="mono-data">{{ $formatPrice(order.currentOrder.totalAmount) }}</span>
        </div>
      </div>

      <v-btn block variant="tonal" color="primary" @click="$router.push('/menu')">
        Back to Menu
      </v-btn>
    </v-container>

    <v-container v-else class="text-center py-12">
      <v-progress-circular indeterminate color="primary" />
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/order'

definePageMeta({ layout: 'default' })

const route = useRoute()
const order = useOrderStore()
const { $socket } = useNuxtApp()

const orderId = route.params.id

function onStatusUpdate(updated) {
  if (updated.id === orderId) order.currentOrder = updated
}

onMounted(async () => {
  await order.fetchOrder(orderId)
  $socket.emit('join:order', orderId)
  $socket.on('order:status', onStatusUpdate)
})

onBeforeUnmount(() => {
  $socket.off('order:status', onStatusUpdate)
  $socket.emit('leave:order', orderId)
})
</script>
