import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    categories: [],
    loading: false,
    error: null,
  }),

  getters: {
    allItems: (state) => {
      const items = []
      for (const cat of state.categories) {
        items.push(...(cat.menuItems || []))
        for (const sub of cat.subCategories || []) {
          items.push(...(sub.menuItems || []))
        }
      }
      return items
    },
  },

  actions: {
    async fetchMenu(branchId) {
      const { $axios } = useNuxtApp()

      this.loading = true
      this.error = null
      try {
        const res = await $axios.get(`/api/public/branches/${branchId}/menu`)
        if (res.data.statusCode === '00') {
          this.categories = res.data.data || []
        } else {
          this.error = res.data.message
        }
      } catch (err) {
        console.error('Failed to load menu:', err)
        this.error = 'Unable to load the menu right now'
      } finally {
        this.loading = false
      }
    },

    findItem(id) {
      return this.allItems.find((i) => i.id === id) || null
    },
  },
})
