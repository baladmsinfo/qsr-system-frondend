<template>
  <div class="app-card mb-4 pa-4 d-flex justify-space-between ga-4 item-card" @click="$emit('open', item)">
    <div class="d-flex flex-column flex-grow-1" style="min-width: 0">
      <div class="d-flex align-center ga-2 mb-2">
        <span class="veg-indicator" :class="item.isVeg ? 'is-veg' : 'is-nonveg'"><span class="veg-dot" /></span>
        <span v-if="item.isRecommended" class="badge-tag">Recommended</span>
        <span v-if="item.isPopular" class="badge-tag">Popular</span>
      </div>

      <div class="text-subtitle-1 font-weight-bold mb-1">{{ item.name }}</div>
      <div class="text-body-1 font-weight-bold mono-data">{{ $formatPrice(item.price) }}</div>

      <div v-if="item.description" class="text-body-2 text-medium-emphasis mt-1 description-clamp">
        {{ item.description }}
      </div>

      <div v-if="item.availability !== 'AVAILABLE'" class="mt-2">
        <v-chip size="x-small" color="grey" variant="tonal">{{ item.availability === 'OUT_OF_STOCK' ? 'Out of stock' : 'Unavailable' }}</v-chip>
      </div>
    </div>

    <div class="position-relative flex-shrink-0" style="width: 100px">
      <v-img v-if="item.imageUrl" :src="item.imageUrl" height="100" width="100" cover rounded="lg" />
      <div v-else class="d-flex align-center justify-center rounded-lg" style="height: 100px; width: 100px; background: #f0f0f0">
        <v-icon color="grey">mdi-food</v-icon>
      </div>

      <v-btn
        v-if="item.availability === 'AVAILABLE'"
        size="small"
        color="primary"
        rounded="pill"
        class="quick-add font-weight-bold"
        @click.stop="$emit('open', item)"
      >
        ADD
      </v-btn>
    </div>
  </div>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['open'])
</script>

<style scoped>
.item-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.item-card:active {
  transform: scale(0.99);
}

.description-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.quick-add {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.badge-tag {
  background: #000;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.03em;
}
</style>
