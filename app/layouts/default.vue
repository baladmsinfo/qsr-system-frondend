<template>
  <v-main class="bg-background" style="min-height: 100vh">
    <div :class="showBottomNav ? 'pb-16' : 'pb-4'">
      <slot />
    </div>
    <CartBar v-if="showCartBar" :raised="showBottomNav" />
    <BottomNavBar v-if="showBottomNav" />
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// Only the menu (browse) screen shows the floating cart summary bar - the
// item detail page has its own embedded sticky Add-to-cart bar, and cart/
// checkout/order/history screens don't need a redundant floating shortcut.
const showCartBar = computed(() => route.name === 'menu')
const showBottomNav = computed(() => ['menu', 'history'].includes(route.name))
</script>
