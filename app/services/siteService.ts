import type { AxiosInstance } from 'axios'
import type { ApiEnvelope, TenantSite } from '@/types/site'

export function useSiteService() {
  const { $axios } = useNuxtApp() as unknown as { $axios: AxiosInstance }

  async function fetchTenantSite(slug: string, coords?: { lat: number; lng: number }): Promise<TenantSite> {
    const res = await $axios.get<ApiEnvelope<TenantSite>>(`/api/public/tenant/${slug}`, {
      params: coords ? { lat: coords.lat, lng: coords.lng } : undefined,
    })
    return res.data.data
  }

  return { fetchTenantSite }
}
