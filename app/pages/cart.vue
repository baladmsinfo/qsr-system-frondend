<template>
  <div>
    <v-sheet color="primary" class="pa-4 text-white d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="$router.push('/menu')" />
      <h1 class="text-h6 font-weight-bold mb-0">Your Cart</h1>
    </v-sheet>

    <v-container>
      <div v-if="!cart.items.length" class="text-center py-12">
        <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
        <p class="text-medium-emphasis mt-4">Your cart is empty</p>
        <v-btn color="primary" class="mt-2" @click="$router.push('/menu')">Browse Menu</v-btn>
      </div>

      <template v-else>
        <div v-for="(item, idx) in cart.items" :key="idx" class="app-card mb-3 pa-3">
          <div class="d-flex justify-space-between">
            <div>
              <div class="font-weight-bold">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis" v-if="item.remarks">Note: {{ item.remarks }}</div>
              <div class="text-body-2 text-primary font-weight-medium mt-1 mono-data">{{ $formatPrice(item.price) }}</div>
            </div>

            <div class="d-flex flex-column align-end justify-space-between">
              <v-btn icon="mdi-delete-outline" size="small" variant="text" color="error" @click="cart.removeItem(idx)" />
              <div class="d-flex align-center ga-2">
                <v-btn icon="mdi-minus" size="x-small" variant="tonal" @click="cart.updateQuantity(idx, item.quantity - 1)" />
                <span class="font-weight-bold">{{ item.quantity }}</span>
                <v-btn icon="mdi-plus" size="x-small" variant="tonal" @click="cart.updateQuantity(idx, item.quantity + 1)" />
              </div>
            </div>
          </div>
        </div>

        <div class="app-card pa-4 mt-4">
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Subtotal</span><span class="mono-data">{{ $formatPrice(cart.subtotal) }}</span>
          </div>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Tax Amount</span><span class="mono-data">{{ $formatPrice(cart.taxAmount) }}</span>
          </div>
          <v-divider class="my-2" />
          <div class="d-flex justify-space-between text-h6 font-weight-bold">
            <span>Total</span><span class="mono-data">{{ $formatPrice(cart.total) }}</span>
          </div>
        </div>

        <v-btn block color="primary" size="large" class="mt-4" @click="$router.push('/checkout')">
          Proceed to Checkout
        </v-btn>
      </template>
    </v-container>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

definePageMeta({ layout: 'default', middleware: 'table' })

const cart = useCartStore()
</script>
