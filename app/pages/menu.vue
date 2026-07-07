<template>
  <div>
    <!-- Branch header -->
    <div class="customer-hero pa-5 pb-8 text-white">
      <div class="d-flex align-center ga-2 mb-1" style="opacity: 0.85">
        <v-icon size="14" color="white">mdi-storefront-outline</v-icon>
        <span class="text-caption text-uppercase font-weight-medium" style="letter-spacing: 0.06em">{{ session.companyName }}</span>
      </div>
      <div class="d-flex align-center justify-space-between">
        <h1 class="text-h5 font-weight-bold mb-0">{{ session.branchName }}</h1>
        <div class="d-flex align-center ga-2">
          <v-chip size="small" color="white" variant="flat" class="text-primary font-weight-bold">
            <v-icon start size="14">mdi-table-furniture</v-icon>{{ session.tableNo }}
          </v-chip>
        </div>
      </div>
    </div>

    <v-container class="px-4 search-overlap">
      <v-text-field
        v-model="search"
        placeholder="Search for dishes..."
        prepend-inner-icon="mdi-magnify"
        density="comfortable"
        bg-color="white"
        hide-details
        class="mb-5 search-field"
        clearable
      />

      <!-- Chef's picks promo banner - data-driven, only shown when the branch actually has recommended items -->
      <div
        v-if="!search && recommendedItems.length && activeCategoryId !== RECOMMENDED_SENTINEL"
        class="promo-banner mb-5 d-flex align-center justify-space-between"
        @click="selectCategory(RECOMMENDED_SENTINEL)"
      >
        <div>
          <div class="d-flex align-center ga-2 mb-1">
            <v-icon color="accent" size="18">mdi-star-circle</v-icon>
            <span class="text-caption text-uppercase font-weight-bold" style="letter-spacing: 0.06em; opacity: 0.85">Chef's Picks</span>
          </div>
          <div class="text-subtitle-1 font-weight-bold">{{ recommendedItems.length }} dishes our regulars love</div>
          <span class="text-caption" style="opacity: 0.85">Tap to explore &rarr;</span>
        </div>
        <v-icon color="white" size="40" style="opacity: 0.25">mdi-food-turkey</v-icon>
      </div>

      <!-- Category rail -->
      <v-slide-group v-if="!search" show-arrows class="mb-3 category-rail">
        <v-slide-group-item>
          <div class="category-chip" :class="{ 'is-active': !activeCategoryId }" @click="selectCategory(null)">
            <div class="category-chip-icon" style="background: linear-gradient(135deg, #FF5722, #FF8A50)">
              <v-icon color="white" size="26">mdi-view-grid</v-icon>
            </div>
            <span class="category-chip-label">All</span>
          </div>
        </v-slide-group-item>
        <v-slide-group-item v-for="(cat, idx) in menu.categories" :key="cat.id">
          <div class="category-chip" :class="{ 'is-active': activeCategoryId === cat.id }" @click="selectCategory(cat.id)">
            <div
              class="category-chip-icon"
              :style="cat.image?.url ? { backgroundImage: `url(${cat.image.url})` } : { background: categoryTint(idx) }"
            >
              <v-icon v-if="!cat.image?.url" :color="categoryIconColor(idx)" size="26">{{ categoryIcon(idx) }}</v-icon>
            </div>
            <span class="category-chip-label">{{ cat.name }}</span>
          </div>
        </v-slide-group-item>
      </v-slide-group>

      <!-- Subcategory rail - only shown when a category with subcategories is selected -->
      <v-slide-group v-if="!search && activeSubCategories.length" show-arrows class="mb-5">
        <v-slide-group-item>
          <v-chip
            class="me-2 font-weight-medium"
            :color="!activeSubCategoryId ? 'secondary' : undefined"
            :variant="!activeSubCategoryId ? 'flat' : 'tonal'"
            @click="activeSubCategoryId = null"
          >
            All {{ activeCategory?.name }}
          </v-chip>
        </v-slide-group-item>
        <v-slide-group-item v-for="sub in activeSubCategories" :key="sub.id">
          <v-chip
            class="me-2 font-weight-medium"
            :color="activeSubCategoryId === sub.id ? 'secondary' : undefined"
            :variant="activeSubCategoryId === sub.id ? 'flat' : 'tonal'"
            @click="activeSubCategoryId = sub.id"
          >
            {{ sub.name }}
          </v-chip>
        </v-slide-group-item>
      </v-slide-group>
      <div v-else-if="!search" class="mb-5" />

      <div v-if="menu.loading" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <div v-else-if="search">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">
          Results for "{{ search }}"
        </h3>
        <ItemCard v-for="item in searchResults" :key="item.id" :item="item" @open="openItem" />
        <div v-if="!searchResults.length" class="text-center py-10">
          <v-icon size="48" color="secondary">mdi-food-off-outline</v-icon>
          <p class="text-medium-emphasis mt-3">No dishes match "{{ search }}"</p>
        </div>
      </div>

      <div v-else>
        <div v-for="group in visibleGroups" :key="group.key" class="mb-6">
          <h3 v-if="!group.sub" class="text-subtitle-1 font-weight-bold mb-3">{{ group.heading }}</h3>
          <h4 v-else class="text-subtitle-2 font-weight-bold mt-4 mb-3 text-secondary">{{ group.heading }}</h4>
          <ItemCard v-for="item in group.items" :key="item.id" :item="item" @open="openItem" />
        </div>

        <div v-if="!visibleGroups.length" class="text-center py-10">
          <v-icon size="48" color="secondary">mdi-silverware-clean</v-icon>
          <p class="text-medium-emphasis mt-3">No dishes in this category yet</p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useMenuStore } from '@/stores/menu'

definePageMeta({ layout: 'default', middleware: 'table' })

const router = useRouter()
const session = useSessionStore()
const menu = useMenuStore()

const search = ref('')
const activeCategoryId = ref(null)
const activeSubCategoryId = ref(null)

const CATEGORY_ICONS = ['mdi-noodles', 'mdi-bowl-mix-outline', 'mdi-pizza', 'mdi-hamburger', 'mdi-cupcake', 'mdi-coffee', 'mdi-fruit-watermelon', 'mdi-rice', 'mdi-ice-cream', 'mdi-bread-slice']
const CATEGORY_TINTS = [
  { bg: '#FFE5D5', icon: '#FF5722' },
  { bg: '#DFF5E8', icon: '#00A86B' },
  { bg: '#FDECC8', icon: '#FFB300' },
  { bg: '#E3E8FD', icon: '#5B6EF5' },
  { bg: '#FDE1EC', icon: '#E11D48' },
  { bg: '#E0F7F5', icon: '#0EA5A5' },
]

function categoryIcon(idx) {
  return CATEGORY_ICONS[idx % CATEGORY_ICONS.length]
}
function categoryTint(idx) {
  return CATEGORY_TINTS[idx % CATEGORY_TINTS.length].bg
}
function categoryIconColor(idx) {
  return CATEGORY_TINTS[idx % CATEGORY_TINTS.length].icon
}

const searchResults = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return []
  return menu.allItems.filter((i) => i.name.toLowerCase().includes(q))
})

const activeCategory = computed(() => menu.categories.find((c) => c.id === activeCategoryId.value) || null)
const activeSubCategories = computed(() => activeCategory.value?.subCategories?.filter((s) => s.menuItems?.length) || [])

// Groups the currently-selected category/subcategory scope into headed
// sections for rendering - collapses to "All" (every category + subcategory)
// when nothing is selected.
const visibleGroups = computed(() => {
  if (!activeCategoryId.value) {
    return menu.categories.flatMap((cat) => {
      const groups = []
      if (cat.menuItems?.length) groups.push({ key: cat.id, heading: cat.name, items: cat.menuItems })
      for (const sub of cat.subCategories || []) {
        if (sub.menuItems?.length) groups.push({ key: sub.id, heading: sub.name, items: sub.menuItems, sub: true })
      }
      return groups
    })
  }

  const cat = activeCategory.value
  if (!cat) return []

  if (activeSubCategoryId.value) {
    const sub = cat.subCategories.find((s) => s.id === activeSubCategoryId.value)
    return sub ? [{ key: sub.id, heading: sub.name, items: sub.menuItems || [] }] : []
  }

  const groups = []
  if (cat.menuItems?.length) groups.push({ key: cat.id, heading: cat.name, items: cat.menuItems })
  for (const sub of cat.subCategories || []) {
    if (sub.menuItems?.length) groups.push({ key: sub.id, heading: sub.name, items: sub.menuItems, sub: true })
  }
  return groups
})

function selectCategory(id) {
  activeCategoryId.value = id
  activeSubCategoryId.value = null
}

watch(activeCategoryId, () => {
  activeSubCategoryId.value = null
})

function openItem(item) {
  router.push(`/item/${item.id}`)
}

onMounted(async () => {
  await menu.fetchMenu(session.branchId)
})
</script>

<style scoped>
.search-overlap {
  position: relative;
  z-index: 3;
  margin-top: -20px;
}
.search-field :deep(.v-field) {
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.14);
}
.category-rail :deep(.v-slide-group__content) {
  gap: 4px;
}
</style>
