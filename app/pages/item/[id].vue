<template>
  <div v-if="item" class="d-flex flex-column" style="min-height: 100vh">
    <div class="position-relative flex-shrink-0">
      <v-img v-if="item.imageUrl" :src="item.imageUrl" height="240" cover />
      <div v-else class="d-flex align-center justify-center item-hero-placeholder" style="height: 200px">
        <v-icon size="52" color="primary">mdi-food</v-icon>
      </div>
      <v-btn icon="mdi-arrow-left" variant="flat" color="white" class="back-btn" @click="$router.back()" />
    </div>

    <v-container class="flex-grow-1 pb-4">
      <div class="d-flex align-center ga-2 mb-2 flex-wrap">
        <span class="veg-indicator" :class="item.isVeg ? 'is-veg' : 'is-nonveg'"><span class="veg-dot" /></span>
        <span v-if="item.isRecommended" class="badge-tag"><v-icon size="10">mdi-star</v-icon>Recommended</span>
        <span v-if="item.isPopular" class="badge-tag badge-tag--popular"><v-icon size="10">mdi-fire</v-icon>Popular</span>
        <span v-if="item.preparationType === 'READY_TO_SERVE'" class="badge-tag badge-tag--info"><v-icon size="10">mdi-lightning-bolt</v-icon>Ready to serve</span>
      </div>

      <h2 class="text-h5 font-weight-bold">{{ item.name }}</h2>
      <div class="d-flex align-center ga-1 text-h6 text-primary font-weight-bold my-2 mono-data">
        {{ $formatPrice(item.price) }}
        <span v-if="item.unitType" class="text-body-2 text-medium-emphasis font-weight-medium">/ {{ unitShortLabel(item) }}</span>
      </div>

      <p v-if="item.description" class="text-body-2 text-medium-emphasis">{{ item.description }}</p>

      <div class="d-flex flex-wrap ga-2 my-3">
        <v-chip v-if="item.prepTimeMinutes" size="small" variant="tonal" color="secondary" prepend-icon="mdi-clock-outline">
          {{ item.prepTimeMinutes }} min
        </v-chip>
        <v-chip v-if="item.spicyLevel" size="small" variant="tonal" color="error" prepend-icon="mdi-chili-mild">
          {{ 'Spicy '.repeat(1) }}{{ '🌶'.repeat(item.spicyLevel) }}
        </v-chip>
        <v-chip v-for="tag in item.tags" :key="tag" size="small" variant="tonal" color="accent">{{ tag }}</v-chip>
      </div>

      <v-alert v-if="item.availability !== 'AVAILABLE'" type="warning" variant="tonal" class="mb-4">
        This item is currently {{ item.availability === 'OUT_OF_STOCK' ? 'out of stock' : 'unavailable' }}.
      </v-alert>

      <v-textarea
        v-else
        v-model="remarks"
        label="Special instructions (optional)"
        rows="2"
        density="comfortable"
        class="mb-2"
      />
    </v-container>

    <div v-if="item.availability === 'AVAILABLE'" class="sticky-bottom-bar pa-4 d-flex align-center justify-space-between ga-3">
      <v-text-field
        v-if="item.unitType"
        v-model.number="quantity"
        type="number"
        min="0"
        :suffix="unitShortLabel(item)"
        density="comfortable"
        hide-details
        style="max-width: 130px"
      />
      <div v-else class="d-flex align-center ga-3 qty-stepper">
        <v-btn icon="mdi-minus" size="small" variant="flat" color="surface-variant" :disabled="quantity <= 1" @click="quantity--" />
        <span class="text-h6 font-weight-bold mono-data">{{ quantity }}</span>
        <v-btn icon="mdi-plus" size="small" variant="flat" color="primary" @click="quantity++" />
      </div>

      <v-btn color="primary" size="large" class="flex-grow-1" :disabled="!quantity || quantity <= 0" @click="add">
        Add &middot; {{ $formatPrice(item.price * (quantity || 0)) }}
      </v-btn>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <v-progress-circular indeterminate color="primary" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useSessionStore } from '@/stores/session'
import { useMenuStore } from '@/stores/menu'
import { useCartStore } from '@/stores/cart'
import { useUnitLabel } from '@/composables/useUnitLabel'

definePageMeta({ layout: 'default', middleware: 'table' })

const route = useRoute()
const router = useRouter()
const toast = useToast()
const session = useSessionStore()
const menu = useMenuStore()
const cart = useCartStore()
const { unitShortLabel } = useUnitLabel()

const quantity = ref(1)
const remarks = ref('')

const item = computed(() => menu.findItem(route.params.id))

function add() {
  if (!quantity.value || quantity.value <= 0) return
  cart.addItem(item.value, quantity.value, remarks.value.trim())
  toast.success(`${item.value.name} added to cart`)
  router.back()
}

onMounted(async () => {
  if (!menu.categories.length) {
    await menu.fetchMenu(session.branchId)
  }
})
</script>

<style scoped>
.item-hero-placeholder {
  background: linear-gradient(135deg, #FFE5D5, #FDECC8);
}

.back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}

.qty-stepper {
  background: #FFF3EC;
  border-radius: 999px;
  padding: 4px 8px;
}
</style>
