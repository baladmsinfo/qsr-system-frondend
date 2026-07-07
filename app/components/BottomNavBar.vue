<template>
  <nav class="bottom-nav-bar d-flex justify-space-around align-center py-1">
    <div @click="$router.push('/menu')" class="bottom-nav-item" :class="{ 'is-active': route.name === 'menu' }">
      <v-icon size="22">mdi-silverware-fork-knife</v-icon>
      <span>Menu</span>
    </div>
    <div @click="$router.push('/history')" class="bottom-nav-item" :class="{ 'is-active': route.name === 'history' }">
      <v-icon size="22">{{ route.name === 'history' ? 'mdi-receipt-text' : 'mdi-receipt-text-outline' }}</v-icon>
      <span>Orders</span>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
