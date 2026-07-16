<template>
  <div>
    <div class="customer-hero pa-5 pb-8 text-white">
      <NuxtLink to="/" class="d-flex align-center ga-1 text-white text-decoration-none mb-2" style="opacity: 0.85; width: fit-content">
        <v-icon size="16" color="white">mdi-arrow-left</v-icon>
        <span class="text-caption font-weight-medium">{{ store.site?.name }}</span>
      </NuxtLink>
      <h1 class="text-h5 font-weight-bold mb-0">{{ branch?.name }}</h1>
      <span class="text-caption text-uppercase font-weight-medium" style="opacity: 0.85; letter-spacing: 0.06em">Menu preview</span>
    </div>

    <v-slide-group v-if="categories.length > 1" show-arrows class="category-nav px-2 py-2">
      <v-slide-group-item v-for="cat in categories" :key="cat.id">
        <v-chip class="me-2 font-weight-medium" variant="tonal" color="primary" @click="scrollToCategory(cat.id)">
          {{ cat.name }}
        </v-chip>
      </v-slide-group-item>
    </v-slide-group>

    <v-container class="px-4 py-6">
      <v-alert type="info" variant="tonal" density="comfortable" class="mb-5">
        This is a menu preview. Scan the QR code at your table, or visit us, to place an order.
      </v-alert>

      <div v-if="pending" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <div v-else-if="error" class="text-center py-10">
        <v-icon size="48" color="secondary">mdi-alert-circle-outline</v-icon>
        <p class="text-medium-emphasis mt-3">{{ error?.message || 'Something went wrong' }}</p>
        <v-btn class="mt-3" color="primary" variant="tonal" @click="load">Retry</v-btn>
      </div>

      <template v-else>
        <div v-for="cat in categories" :id="`cat-${cat.id}`" :key="cat.id" class="mb-6 category-anchor">
          <h3 class="text-subtitle-1 font-weight-bold mb-3">{{ cat.name }}</h3>
          <div class="item-grid">
            <ItemCard v-for="item in cat.menuItems" :key="item.id" :item="item" @open="() => {}" />
          </div>

          <div v-for="sub in cat.subCategories" :key="sub.id" class="mt-4">
            <h4 class="text-subtitle-2 font-weight-bold mb-3 text-secondary">{{ sub.name }}</h4>
            <div class="item-grid">
              <ItemCard v-for="item in sub.menuItems" :key="item.id" :item="item" @open="() => {}" />
            </div>
          </div>
        </div>

        <div v-if="!categories.length" class="text-center py-10">
          <v-icon size="48" color="secondary">mdi-silverware-clean</v-icon>
          <p class="text-medium-emphasis mt-3">No dishes published yet</p>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTenantSite } from '@/composables/useTenantSite'
import { useStorefrontSeo } from '@/composables/useStorefrontSeo'
import { useBranchMenuService } from '@/services/branchMenuService'
import ItemCard from '@/components/ItemCard.vue'

definePageMeta({ layout: 'default' })

const route = useRoute()
const branchId = route.params.branchId as string

const store = await useTenantSite()
useStorefrontSeo(() => store.site)

if (!store.site) {
  throw createError({ statusCode: 404, statusMessage: 'Restaurant not found' })
}

const branch = computed(() => store.site?.branches.find((b) => b.id === branchId) || null)
if (!branch.value) {
  throw createError({ statusCode: 404, statusMessage: 'Location not found' })
}

const { fetchBranchMenu } = useBranchMenuService()
const { data: categories, pending, error, refresh: load } = await useAsyncData(
  `branch-menu-${branchId}`,
  async () => {
    try {
      return await fetchBranchMenu(branchId)
    } catch {
      throw new Error('Unable to load the menu right now')
    }
  },
  { default: () => [] },
)

function scrollToCategory(categoryId: string) {
  if (!import.meta.client) return
  document.getElementById(`cat-${categoryId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.category-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fdf8ee;
}
.category-anchor {
  scroll-margin-top: 64px;
}
.item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (min-width: 600px) {
  .item-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 960px) {
  .item-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
