import { defineStore } from 'pinia'

const HISTORY_KEY = 'qsr_order_history'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null,
    history: [],
    placing: false,
    error: null,
  }),

  actions: {
    restoreHistory() {
      if (!process.client) return
      const raw = localStorage.getItem(HISTORY_KEY)
      if (!raw) return
      try {
        this.history = JSON.parse(raw)
      } catch (err) {
        this.history = []
      }
    },

    saveToHistory(order) {
      if (!process.client) return
      this.history.unshift({
        id: order.id,
        tableNo: order.table?.tableNo,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
      })
      this.history = this.history.slice(0, 20)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history))
    },

    async placeOrder({ branchId, tableId, items, customerName, customerPhone, notes }) {
      const { $axios } = useNuxtApp()

      this.placing = true
      this.error = null
      try {
        const res = await $axios.post('/api/public/orders', {
          branchId,
          tableId,
          customerName,
          customerPhone,
          notes,
          items: items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity, remarks: i.remarks })),
        })

        if (res.data.statusCode === '00') {
          this.currentOrder = res.data.data
          this.saveToHistory(res.data.data)
          return res.data.data
        }

        this.error = res.data.message || 'Failed to place order'
        return null
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to place order'
        return null
      } finally {
        this.placing = false
      }
    },

    async fetchOrder(id) {
      const { $axios } = useNuxtApp()
      try {
        const res = await $axios.get(`/api/public/orders/${id}`)
        if (res.data.statusCode === '00') {
          this.currentOrder = res.data.data
        }
        return this.currentOrder
      } catch (err) {
        console.error('Failed to fetch order:', err)
        return null
      }
    },
  },
})
