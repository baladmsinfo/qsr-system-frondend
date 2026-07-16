import { defineStore } from 'pinia'
import type { TenantSite } from '@/types/site'

export const useSiteStore = defineStore('site', {
  state: () => ({
    slug: null as string | null,
    site: null as TenantSite | null,
    notFound: false,
  }),

  actions: {
    setResolved(slug: string | null, site: TenantSite | null) {
      this.slug = slug
      this.site = site
      this.notFound = slug !== null && site === null
    },
  },
})
