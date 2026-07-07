<template>
  <v-slide-y-reverse-transition>
    <v-sheet
      v-if="cart.itemCount > 0"
      class="cart-bar d-flex align-center justify-space-between px-4 py-3"
      :class="{ 'cart-bar--raised': raised }"
      @click="$router.push('/cart')"
    >
      <div class="d-flex align-center ga-3 text-white">
        <v-avatar size="34" color="rgba(255,255,255,0.22)">
          <v-icon color="white" size="18">mdi-cart</v-icon>
        </v-avatar>
        <div>
          <div class="text-caption" style="opacity: 0.9">{{ cart.itemCount }} item(s)</div>
          <div class="text-subtitle-1 font-weight-bold mono-data">{{ $formatPrice(cart.total) }}</div>
        </div>
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
  border-radius: 18px !important;
  background: linear-gradient(120deg, #FF5722, #FF8A50) !important;
  box-shadow: 0 10px 28px -4px rgba(255, 87, 34, 0.45);
  transition: bottom 0.2s ease;
}
.cart-bar--raised {
  bottom: 76px;
}
</style>
