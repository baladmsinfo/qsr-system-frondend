<template>
  <v-slide-y-reverse-transition>
    <v-sheet
      v-if="cart.itemCount > 0"
      color="primary"
      class="cart-bar d-flex align-center justify-space-between px-4 py-3"
      :class="{ 'cart-bar--raised': raised }"
      @click="$router.push('/cart')"
    >
      <div class="text-white">
        <div class="text-caption" style="opacity: 0.85">{{ cart.itemCount }} item(s)</div>
        <div class="text-subtitle-1 font-weight-bold mono-data">{{ $formatPrice(cart.total) }}</div>
      </div>
      <v-btn variant="flat" color="white" class="text-primary font-weight-bold" rounded="pill">
        View Cart
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </v-sheet>
  </v-slide-y-reverse-transition>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
defineProps({ raised: { type: Boolean, default: false } })
const cart = useCartStore()
</script>

<style scoped>
.cart-bar {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 1000;
  cursor: pointer;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35);
  transition: bottom 0.2s ease;
}
.cart-bar--raised {
  bottom: 76px;
}
</style>
