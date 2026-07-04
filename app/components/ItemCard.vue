<template>
  <v-card class="mb-3 d-flex" variant="flat" border @click="$emit('open', item)">
    <div class="flex-grow-1 pa-3">
      <div class="d-flex align-center ga-1 mb-1">
        <v-icon size="14" :color="item.isVeg ? 'green' : 'red'">
          {{ item.isVeg ? 'mdi-square-outline' : 'mdi-triangle-outline' }}
        </v-icon>
        <v-chip v-if="item.isRecommended" size="x-small" color="amber" variant="tonal">Recommended</v-chip>
        <v-chip v-if="item.isPopular" size="x-small" color="deep-orange" variant="tonal">Popular</v-chip>
      </div>

      <div class="font-weight-bold text-body-1">{{ item.name }}</div>
      <div class="text-body-2 font-weight-medium text-primary mt-1">{{ $formatPrice(item.price) }}</div>

      <div v-if="item.description" class="text-caption text-medium-emphasis mt-1 description-clamp">
        {{ item.description }}
      </div>

      <div v-if="item.availability !== 'AVAILABLE'" class="mt-1">
        <v-chip size="x-small" color="grey">{{ item.availability === 'OUT_OF_STOCK' ? 'Out of stock' : 'Unavailable' }}</v-chip>
      </div>
    </div>

    <div class="position-relative flex-shrink-0" style="width: 100px">
      <v-img v-if="item.imageUrl" :src="item.imageUrl" height="100" width="100" cover class="ma-2 rounded-lg" />
      <div v-else class="d-flex align-center justify-center ma-2 rounded-lg bg-grey-lighten-3" style="height: 100px; width: 84px">
        <v-icon color="grey">mdi-food</v-icon>
      </div>

      <v-btn
        v-if="item.availability === 'AVAILABLE'"
        size="small"
        color="primary"
        class="quick-add"
        @click.stop="$emit('open', item)"
      >
        ADD
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
defineProps({ item: { type: Object, required: true } })
defineEmits(['open'])
</script>

<style scoped>
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
}
</style>
