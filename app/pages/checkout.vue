<template>
  <div>
    <v-sheet color="primary" class="pa-4 text-white d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="$router.push('/cart')" />
      <h1 class="text-h6 font-weight-bold mb-0">Checkout</h1>
    </v-sheet>

    <v-container>
      <v-card variant="flat" border class="pa-4 mb-4">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">{{ session.branchName }} &middot; {{ session.tableNo }}</h3>

        <div v-for="(item, idx) in cart.items" :key="idx" class="d-flex justify-space-between text-body-2 mb-1">
          <span>{{ item.quantity }} &times; {{ item.name }}</span>
          <span>{{ $formatPrice(item.price * item.quantity) }}</span>
        </div>

        <v-divider class="my-2" />
        <div class="d-flex justify-space-between text-h6 font-weight-bold">
          <span>Total</span><span>{{ $formatPrice(cart.total) }}</span>
        </div>
      </v-card>

      <v-card variant="flat" border class="pa-4 mb-4">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">Your details (optional)</h3>
        <v-text-field v-model="name" label="Name" variant="outlined" density="comfortable" class="mb-2" />
        <v-text-field v-model="phone" label="Phone number" variant="outlined" density="comfortable" />
        <p class="text-caption text-medium-emphasis">
          Sharing your details helps the restaurant reach you if there's an issue with your order.
        </p>
      </v-card>

      <v-textarea v-model="notes" label="Notes for the kitchen (optional)" variant="outlined" rows="2" class="mb-4" />

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
