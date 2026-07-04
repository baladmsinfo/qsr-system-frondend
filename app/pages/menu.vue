<template>
  <div>
    <!-- Branch header -->
    <v-sheet color="primary" class="pa-4 text-white">
      <div class="text-caption" style="opacity: 0.85">{{ session.companyName }}</div>
      <div class="d-flex align-center justify-space-between">
        <h1 class="text-h6 font-weight-bold mb-0">{{ session.branchName }}</h1>
        <div class="d-flex align-center ga-2">
          <v-chip size="small" color="white" variant="flat" class="text-primary font-weight-bold">
            {{ session.tableNo }}
          </v-chip>
          <v-btn icon="mdi-history" variant="text" color="white" size="small" @click="router.push('/history')" />
        </div>
      </div>
    </v-sheet>

    <v-container class="pt-4">
      <v-text-field
        v-model="search"
        placeholder="Search menu..."
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        density="comfortable"
        flat
        hide-details
        rounded="lg"
        class="mb-4"
        clearable
      />

      <v-slide-group v-if="!search" show-arrows class="mb-4">
        <v-slide-group-item v-for="cat in menu.categories" :key="cat.id">
          <v-chip
            class="me-2"
            :color="activeCategoryId === cat.id ? 'primary' : undefined"
            :variant="activeCategoryId === cat.id ? 'flat' : 'tonal'"
            @click="scrollToCategory(cat.id)"
          >
            {{ cat.name }}
          </v-chip>
        </v-slide-group-item>
      </v-slide-group>

      <div v-if="menu.loading" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <div v-else-if="search">
        <h3 class="text-subtitle-1 font-weight-bold mb-3">
          Results for "{{ search }}"
        </h3>
        <ItemCard v-for="item in searchResults" :key="item.id" :item="item" @open="openItem" />
        <p v-if="!searchResults.length" class="text-medium-emphasis text-center py-8">No items found</p>
      </div>

      <div v-else>
        <div v-for="cat in menu.categories" :key="cat.id" :id="`cat-${cat.id}`" class="mb-6">
          <h3 v-if="cat.menuItems?.length" class="text-subtitle-1 font-weight-bold mb-3">{{ cat.name }}</h3>
          <ItemCard v-for="item in cat.menuItems" :key="item.id" :item="item" @open="openItem" />

          <template v-for="sub in cat.subCategories" :key="sub.id">
            <h4 v-if="sub.menuItems?.length" class="text-subtitle-2 font-weight-bold mt-4 mb-3 text-medium-emphasis">
              {{ sub.name }}
            </h4>
            <ItemCard v-for="item in sub.menuItems" :key="item.id" :item="item" @open="openItem" />
          </template>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useMenuStore } from '@/stores/menu'

definePageMeta({ layout: 'default', middleware: 'table' })

const router = useRouter()
const session = useSessionStore()
const menu = useMenuStore()

const search = ref('')
const activeCategoryId = ref(null)

const searchResults = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return []
  return menu.allItems.filter((i) => i.name.toLowerCase().includes(q))
})

function scrollToCategory(id) {
  activeCategoryId.value = id
  document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openItem(item) {
  router.push(`/item/${item.id}`)
}

onMounted(async () => {
  await menu.fetchMenu(session.branchId)
  activeCategoryId.value = menu.categories[0]?.id || null
})
</script>
