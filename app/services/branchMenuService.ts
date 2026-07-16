import type { AxiosInstance } from 'axios'
import type { ApiEnvelope, PublicMenuCategory } from '@/types/site'

export function useBranchMenuService() {
  const { $axios } = useNuxtApp() as unknown as { $axios: AxiosInstance }

  async function fetchBranchMenu(branchId: string): Promise<PublicMenuCategory[]> {
    const res = await $axios.get<ApiEnvelope<PublicMenuCategory[]>>(`/api/public/branches/${branchId}/menu`)
    return res.data.data
  }

  return { fetchBranchMenu }
}
