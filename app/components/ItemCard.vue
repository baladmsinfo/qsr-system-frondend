<template>
  <div class="app-card grid-card" :class="{ 'grid-card--unavailable': item.availability !== 'AVAILABLE' }" @click="$emit('open', item)">
    <div class="position-relative grid-card-media">
      <v-img v-if="item.imageUrl" :src="item.imageUrl" aspect-ratio="1" cover class="grid-card-img" />
      <div v-else class="d-flex align-center justify-center grid-card-img grid-card-img--placeholder">
        <v-icon color="primary" size="34">mdi-food</v-icon>
      </div>

      <span class="veg-indicator veg-indicator--floating" :class="item.isVeg ? 'is-veg' : 'is-nonveg'"><span class="veg-dot" /></span>

      <div v-if="item.availability !== 'AVAILABLE'" class="grid-card-unavailable-overlay">
        <v-chip size="x-small" color="error" variant="flat">{{ item.availability === 'OUT_OF_STOCK' ? 'Out of stock' : 'Unavailable' }}</v-chip>
      </div>

      <v-btn
        v-else
        size="small"
        color="primary"
        rounded="pill"
        class="quick-add font-weight-bold"
        @click.stop="$emit('open', item)"
      >
        <v-icon size="18">mdi-plus</v-icon>
      </v-btn>

      <div v-if="item.isRecommended || item.isPopular || item.preparationType === 'READY_TO_SERVE'" class="grid-card-badges">
        <span v-if="item.isRecommended" class="badge-tag"><v-icon size="10">mdi-star</v-icon>Top pick</span>
        <span v-else-if="item.isPopular" class="badge-tag badge-tag--popular"><v-icon size="10">mdi-fire</v-icon>Popular</span>
        <span v-else-if="item.preparationType === 'READY_TO_SERVE'" class="badge-tag badge-tag--info"><v-icon size="10">mdi-lightning-bolt</v-icon>Ready</span>
      </div>
    </div>

    <div class="pa-3 pt-2">
      <div class="text-body-2 font-weight-bold grid-card-title">{{ item.name }}</div>
      <div class="d-flex align-center ga-1 text-body-2 font-weight-bold text-primary mono-data mt-1">
        {{ $formatPrice(item.price) }}
        <span v-if="item.unitType" class="text-caption text-medium-emphasis font-weight-medium">/ {{ unitShortLabel(item) }}</span>
      </div>
      <div v-if="item.prepTimeMinutes" class="d-flex align-center ga-1 text-caption text-medium-emphasis mt-1">
        <v-icon size="12">mdi-clock-outline</v-icon>{{ item.prepTimeMinutes }} min
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUnitLabel } from '@/composables/useUnitLabel'

defineProps({ item: { type: Object, required: true } })
defineEmits(['open'])

const { unitShortLabel } = useUnitLabel()
</script>

<style scoped>
.grid-card {
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.grid-card:active {
  transform: scale(0.98);
}
.grid-card--unavailable {
  opacity: 0.75;
}

.grid-card-media {
  width: 100%;
}
.grid-card-img {
  width: 100%;
}
.grid-card-img--placeholder {
  aspect-ratio: 1;
}

.veg-indicator--floating {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.grid-card-unavailable-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-add {
  position: absolute;
  bottom: 8px;
  right: 8px;
  min-width: 0;
  width: 34px;
  height: 34px;
  padding: 0;
  box-shadow: 0 4px 12px rgba(255, 87, 34, 0.45);
}

.grid-card-badges {
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.grid-card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
}
</style>
