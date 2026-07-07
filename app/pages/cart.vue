<template>
  <div>
    <div class="customer-hero pa-4 pb-5 text-white d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="tonal" color="white" size="small" @click="$router.push('/menu')" />
      <h1 class="text-h5 font-weight-bold mb-0">Your Cart</h1>
    </div>

    <v-container>
      <div v-if="!cart.items.length" class="text-center py-12">
        <div class="empty-icon-badge mx-auto mb-4">
          <v-icon size="40" color="primary">mdi-cart-outline</v-icon>
        </div>
        <p class="text-medium-emphasis">Your cart is empty</p>
        <v-btn color="primary" class="mt-2" @click="$router.push('/menu')">Browse Menu</v-btn>
      </div>

      <template v-else>
        <div v-for="(item, idx) in cart.items" :key="idx" class="app-card mb-3 pa-3">
          <div class="d-flex justify-space-between">
            <div>
              <div class="font-weight-bold">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis" v-if="item.remarks">Note: {{ item.remarks }}</div>
              <div class="text-body-2 text-primary font-weight-bold mt-1 mono-data">{{ $formatPrice(item.price) }}<span v-if="item.unitType" class="text-caption text-medium-emphasis font-weight-medium"> / {{ unitShortLabel(item) }}</span></div>
            </div>

            <div class="d-flex flex-column align-end justify-space-between">
              <v-btn icon="mdi-delete-outline" size="small" variant="text" color="error" @click="cart.removeItem(idx)" />

              <v-text-field
                v-if="item.unitType"
                :model-value="item.quantity"
                type="number"
                min="0"
                :suffix="unitShortLabel(item)"
                density="compact"
                hide-details
                style="max-width: 110px"
                @update:model-value="(v) => cart.updateQuantity(idx, Number(v))"
              />
              <div v-else class="d-flex align-center ga-2 qty-stepper-sm">
                <v-btn icon="mdi-minus" size="x-small" variant="flat" color="surface-variant" @click="cart.updateQuantity(idx, item.quantity - 1)" />
                <span class="font-weight-bold">{{ item.quantity }}</span>
                <v-btn icon="mdi-plus" size="x-small" variant="flat" color="primary" @click="cart.updateQuantity(idx, item.quantity + 1)" />
              </div>
            </div>
          </div>
        </div>

        <div class="app-card pa-4 mt-4 bill-summary">
          <h3 class="text-subtitle-2 font-weight-bold mb-3 text-medium-emphasis">Bill Details</h3>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Subtotal</span><span class="mono-data">{{ $formatPrice(cart.subtotal) }}</span>
          </div>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Tax Amount</span><span class="mono-data">{{ $formatPrice(cart.taxAmount) }}</span>
          </div>
          <v-divider class="my-2" />
          <div class="d-flex justify-space-between text-h6 font-weight-bold">
            <span>Total</span><span class="mono-data text-primary">{{ $formatPrice(cart.total) }}</span>
          </div>
        </div>

        <v-btn block color="primary" size="large" class="mt-4" @click="$router.push('/checkout')">
          Proceed to Checkout
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
      </template>
    </v-container>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useUnitLabel } from '@/composables/useUnitLabel'

definePageMeta({ layout: 'default', middleware: 'table' })

const cart = useCartStore()
const { unitShortLabel } = useUnitLabel()
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
.qty-stepper-sm {
  background: #FFF3EC;
  border-radius: 999px;
  padding: 2px 6px;
}
.bill-summary {
  border: 1px dashed rgba(255, 87, 34, 0.25);
}
</style>
