<template>
  <div>
    <div class="customer-hero pa-4 pb-5 text-white d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="tonal" color="white" size="small" @click="$router.push('/cart')" />
      <h1 class="text-h5 font-weight-bold mb-0">Checkout</h1>
    </div>

    <v-container>
      <div class="app-card pa-4 mb-4">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">{{ session.branchName }} &middot; {{ session.tableNo }}</h3>

        <div v-for="(item, idx) in cart.items" :key="idx" class="d-flex justify-space-between text-body-2 mb-1">
          <span>{{ item.quantity }} &times; {{ item.name }}</span>
          <span class="mono-data">{{ $formatPrice(item.price * item.quantity) }}</span>
        </div>

        <v-divider class="my-2" />
        <div class="d-flex justify-space-between text-h6 font-weight-bold">
          <span>Total</span><span class="mono-data">{{ $formatPrice(cart.total) }}</span>
        </div>
      </div>

      <div class="app-card pa-4 mb-4">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">Your details (optional)</h3>
        <v-text-field v-model="name" label="Name" density="comfortable" class="mb-2" />
        <v-text-field v-model="phone" label="Phone number" density="comfortable" />
        <p class="text-caption text-medium-emphasis mb-0">
          Sharing your details helps the restaurant reach you if there's an issue with your order.
        </p>
      </div>

      <v-textarea v-model="notes" label="Notes for the kitchen (optional)" rows="2" class="mb-4" />

      <v-alert v-if="order.error" type="error" variant="tonal" class="mb-4">{{ order.error }}</v-alert>

      <v-btn block color="primary" size="large" :loading="order.placing" @click="submit">
        Place Order &middot; {{ $formatPrice(cart.total) }}
      </v-btn>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'

definePageMeta({ layout: 'default', middleware: 'table' })

const router = useRouter()
const session = useSessionStore()
const cart = useCartStore()
const order = useOrderStore()

const name = ref(session.customerName || '')
const phone = ref(session.customerPhone || '')
const notes = ref('')

async function submit() {
  if (!cart.items.length) return

  session.setCustomer(name.value.trim(), phone.value.trim())

  const placed = await order.placeOrder({
    branchId: session.branchId,
    tableId: session.tableId,
    items: cart.items,
    customerName: name.value.trim() || undefined,
    customerPhone: phone.value.trim() || undefined,
    notes: notes.value.trim() || undefined,
  })

  if (placed) {
    cart.clear()
    router.replace(`/order/${placed.id}`)
  }
}
</script>
