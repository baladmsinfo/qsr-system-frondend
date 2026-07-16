import { defineStore } from 'pinia'

const STORAGE_KEY = 'qsr_session'

export const useSessionStore = defineStore('session', {
  state: () => ({
    branchId: null,
    tableId: null,
    tableNo: null,
    companyId: null,
    companyName: null,
    branchName: null,
    tenantSlug: null,
    isOnline: true,
    acceptOrders: true,
    customerName: null,
    customerPhone: null,
  }),

  actions: {
    restore() {
      if (!process.client) return
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      try {
        Object.assign(this, JSON.parse(raw))
      } catch (err) {
        // corrupt/incompatible cached session - ignore and let a fresh QR scan repopulate it
      }
    },

    persist() {
      if (!process.client) return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
    },

    setFromQr(table) {
      this.branchId = table.branch.id
      this.tableId = table.id
      this.tableNo = table.tableNo
      this.companyId = table.branch.companyId
      this.companyName = table.branch.company?.name || null
      this.branchName = table.branch.name
      this.tenantSlug = table.branch.company?.tenant || null
      this.isOnline = table.branch.isOnline
      this.acceptOrders = table.branch.acceptOrders
      this.persist()
    },

    setCustomer(name, phone) {
      this.customerName = name || null
      this.customerPhone = phone || null
      this.persist()
    },

    hasTable() {
      return !!(this.branchId && this.tableId)
    },
  },
})
