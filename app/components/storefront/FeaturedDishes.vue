<template>
  <div v-if="featuredItems.length" class="mb-8">
    <div class="d-flex align-center ga-2 mb-3">
      <v-icon color="accent" size="20">mdi-star-circle</v-icon>
      <h2 class="text-subtitle-1 font-weight-bold mb-0">Popular picks</h2>
    </div>
    <v-slide-group show-arrows class="featured-rail">
      <v-slide-group-item v-for="item in featuredItems" :key="item.id">
        <div class="featured-card-wrap me-3">
          <ItemCard :item="item" @open="() => navigateTo(`/browse/${branchId}`)" />
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBranchMenuService } from '@/services/branchMenuService'
import ItemCard from '@/components/ItemCard.vue'

const props = defineProps<{ branchId: string }>()

const { fetchBranchMenu } = useBranchMenuService()
const { data: categories } = await useAsyncData(
  `featured-menu-${props.branchId}`,
  () => fetchBranchMenu(props.branchId),
  { default: () => [] },
)

const featuredItems = computed(() => {
  const items = (categories.value || []).flatMap((cat) => [
    ...cat.menuItems,
    ...cat.subCategories.flatMap((sub) => sub.menuItems),
  ])
  return items.filter((item) => item.availability === 'AVAILABLE' && (item.isRecommended || item.isPopular)).slice(0, 8)
})
</script>

<style scoped>
.featured-card-wrap {
  width: 160px;
}
</style>
