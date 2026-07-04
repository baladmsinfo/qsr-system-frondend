<template>
  <div v-if="item">
    <v-img v-if="item.imageUrl" :src="item.imageUrl" height="220" cover />
    <div v-else class="d-flex align-center justify-center bg-grey-lighten-3" style="height: 160px">
      <v-icon size="48" color="grey">mdi-food</v-icon>
    </div>

    <v-btn icon="mdi-arrow-left" variant="flat" class="back-btn" @click="$router.back()" />

    <v-container>
      <div class="d-flex align-center ga-2 mb-2">
        <v-icon size="16" :color="item.isVeg ? 'green' : 'red'">
          {{ item.isVeg ? 'mdi-square-outline' : 'mdi-triangle-outline' }}
        </v-icon>
        <v-chip v-if="item.isRecommended" size="x-small" color="amber" variant="tonal">Recommended</v-chip>
        <v-chip v-if="item.isPopular" size="x-small" color="deep-orange" variant="tonal">Popular</v-chip>
      </div>

      <h2 class="text-h6 font-weight-bold">{{ item.name }}</h2>
      <div class="text-h6 text-primary font-weight-bold my-2 mono-data">{{ $formatPrice(item.price) }}</div>

      <p v-if="item.description" class="text-body-2 text-medium-emphasis">{{ item.description }}</p>

      <div class="d-flex flex-wrap ga-2 my-3">
        <v-chip v-if="item.prepTimeMinutes" size="small" variant="tonal" prepend-icon="mdi-clock-outline">
          {{ item.prepTimeMinutes }} min
        </v-chip>
        <v-chip v-if="item.spicyLevel" size="small" variant="tonal" color="red" prepend-icon="mdi-chili-mild">
          {{ 'Spicy '.repeat(1) }}{{ '🌶'.repeat(item.spicyLevel) }}
        </v-chip>
        <v-chip v-for="tag in item.tags" :key="tag" size="small" variant="tonal">{{ tag }}</v-chip>
      </div>

      <v-alert v-if="item.availability !== 'AVAILABLE'" type="warning" variant="tonal" class="mb-4">
        This item is currently {{ item.availability === 'OUT_OF_STOCK' ? 'out of stock' : 'unavailable' }}.
      </v-alert>

      <template v-else>
        <v-textarea
          v-model="remarks"
          label="Special instructions (optional)"
          rows="2"
          variant="outlined"
          density="comfortable"
          class="mb-4"
        />

        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center ga-3">
            <v-btn icon="mdi-minus" size="small" variant="tonal" :disabled="quantity <= 1" @click="quantity--" />
            <span class="text-h6 font-weight-bold">{{ quantity }}</span>
            <v-btn icon="mdi-plus" size="small" variant="tonal" @click="quantity++" />
          </div>

          <v-btn color="primary" size="large" @click="add">
            Add {{ $formatPrice(item.price * quantity) }}
          </v-btn>
        </div>
      </template>
    </v-container>
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

definePageMeta({ layout: 'default', middleware: 'table' })

const route = useRoute()
const router = useRouter()
const toast = useToast()
const session = useSessionStore()
const menu = useMenuStore()
const cart = useCartStore()

const quantity = ref(1)
const remarks = ref('')

const item = computed(() => menu.findItem(route.params.id))

function add() {
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
.back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
}
</style>
