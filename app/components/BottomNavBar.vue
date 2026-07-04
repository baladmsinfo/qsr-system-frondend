<template>
  <nav class="bottom-nav-bar d-flex justify-space-around align-center py-1">
    <NuxtLink to="/menu" class="bottom-nav-item" :class="{ 'is-active': route.name === 'menu' }">
      <v-icon size="22">mdi-silverware-fork-knife</v-icon>
      <span>Menu</span>
    </NuxtLink>
    <NuxtLink to="/history" class="bottom-nav-item" :class="{ 'is-active': route.name === 'history' }">
      <v-icon size="22">mdi-receipt-text-outline</v-icon>
      <span>Orders</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
