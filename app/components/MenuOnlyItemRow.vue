<template>
  <div class="menu-only-row d-flex align-center ga-3 py-3" :class="{ 'menu-only-row--unavailable': item.availability !== 'AVAILABLE' }">
    <v-img v-if="item.imageUrl" :src="item.imageUrl" width="56" height="56" cover class="rounded-lg flex-shrink-0" />
    <div v-else class="menu-only-row-placeholder d-flex align-center justify-center flex-shrink-0">
      <v-icon color="primary" size="22">mdi-food</v-icon>
    </div>

    <div class="flex-grow-1" style="min-width: 0">
      <div class="d-flex align-center ga-2">
        <span class="veg-indicator" :class="item.isVeg ? 'is-veg' : 'is-nonveg'"><span class="veg-dot" /></span>
        <span class="text-body-2 font-weight-bold text-truncate">{{ item.name }}</span>
        <v-chip v-if="item.availability !== 'AVAILABLE'" size="x-small" color="error" variant="flat">
          {{ item.availability === 'OUT_OF_STOCK' ? 'Out of stock' : 'Unavailable' }}
        </v-chip>
      </div>
      <p v-if="item.description" class="text-caption text-medium-emphasis mb-0 mt-1 menu-only-desc">{{ item.description }}</p>
    </div>

    <div class="text-body-2 font-weight-bold text-primary flex-shrink-0 text-right">
      {{ $formatPrice(item.price) }}
      <span v-if="item.unitType" class="text-caption text-medium-emphasis font-weight-medium d-block">/ {{ unitShortLabel(item) }}</span>
    </div>
  </div>
</template>

<script setup>
import { useUnitLabel } from '@/composables/useUnitLabel'

defineProps({ item: { type: Object, required: true } })

const { unitShortLabel } = useUnitLabel()
</script>

<style scoped>
.menu-only-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.menu-only-row:last-child {
  border-bottom: none;
}
.menu-only-row--unavailable {
  opacity: 0.6;
}
.menu-only-row-placeholder {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.04);
}
.menu-only-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
