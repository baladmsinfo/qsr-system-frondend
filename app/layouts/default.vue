<template>
  <v-main class="bg-background" style="min-height: 100vh">
    <div class="pb-16">
      <slot />
    </div>
    <CartBar v-if="showCartBar" />
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showCartBar = computed(() => !['cart', 'checkout'].includes(route.name))
</script>
