<template>
  <v-slide-y-reverse-transition>
    <v-sheet
      v-if="cart.itemCount > 0"
      color="primary"
      class="cart-bar d-flex align-center justify-space-between px-4 py-3"
      @click="$router.push('/cart')"
    >
      <div class="text-white">
        <div class="text-caption" style="opacity: 0.85">{{ cart.itemCount }} item(s)</div>
        <div class="text-subtitle-1 font-weight-bold">{{ $formatPrice(cart.total) }}</div>
      </div>
      <v-btn variant="flat" color="white" class="text-primary font-weight-bold">
        View Cart
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </v-sheet>
  </v-slide-y-reverse-transition>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cart = useCartStore()
</script>

<style scoped>
.cart-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  cursor: pointer;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
}
</style>
