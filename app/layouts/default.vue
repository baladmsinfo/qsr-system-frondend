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
const showCartBar = computed(() => !['cart', 'checkout'].includes(route.name))
const showBottomNav = computed(() => ['menu', 'history'].includes(route.name))
</script>
