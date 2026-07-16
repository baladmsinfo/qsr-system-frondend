import { resolveTenantSlugFromHost } from '@/utils/tenantHost'
import { useSiteService } from '@/services/siteService'
import { useSiteStore } from '@/stores/site'

// Resolves which tenant (if any) owns the current request's hostname and
// populates the SiteStore. Awaiting this in a page's <script setup> (Nuxt
// wraps page components in Suspense automatically) blocks SSR rendering
// until resolution completes, so pages can reliably 404 on an unresolved
// tenant and crawlers always get the real, final content - never a loading
// skeleton. useAsyncData's 'tenant-site' key also means only one network
// call happens per request, no matter how many components call this.
export async function useTenantSite() {
  const store = useSiteStore()
  const headers = useRequestHeaders(['host'])
  const config = useRuntimeConfig()

  const { data } = await useAsyncData('tenant-site', async () => {
    const slug = resolveTenantSlugFromHost(headers.host, config.public.apexDomain)
    if (!slug) return { slug: null as string | null, site: null }

    const { fetchTenantSite } = useSiteService()
    try {
      const site = await fetchTenantSite(slug)
      return { slug, site }
    } catch {
      return { slug, site: null }
    }
  })

  if (data.value) store.setResolved(data.value.slug, data.value.site)
  return store
}
