import { defineStore } from 'pinia'

const STORAGE_KEY = 'qsr_cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // { menuItemId, name, price, quantity, remarks, imageUrl, taxRate }
  }),

  getters: {
    itemCount: (state) => state.items.reduce((s, i) => s + i.quantity, 0),
    subtotal: (state) => state.items.reduce((s, i) => s + i.price * i.quantity, 0),
    taxAmount: (state) =>
      state.items.reduce((s, i) => s + (i.price * i.quantity * (i.taxRate?.rate || 0)) / 100, 0),
    total(state) {
      return this.subtotal + this.taxAmount
    },
  },

  actions: {
    restore() {
      if (!process.client) return
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      try {
        this.items = JSON.parse(raw)
      } catch (err) {
        this.items = []
      }
    },

    persist() {
      if (!process.client) return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },

    addItem(menuItem, quantity = 1, remarks = '') {
      const existing = this.items.find((i) => i.menuItemId === menuItem.id && i.remarks === remarks)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          imageUrl: menuItem.imageUrl,
          taxRate: menuItem.taxRate,
          quantity,
          remarks,
        })
      }
      this.persist()
    },

    updateQuantity(index, quantity) {
      if (quantity <= 0) {
        this.items.splice(index, 1)
      } else {
        this.items[index].quantity = quantity
      }
      this.persist()
    },

    removeItem(index) {
      this.items.splice(index, 1)
      this.persist()
    },

    clear() {
      this.items = []
      this.persist()
    },
  },
})
