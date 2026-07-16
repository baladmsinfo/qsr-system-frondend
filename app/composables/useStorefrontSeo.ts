import type { TenantSite } from '@/types/site'

// JSON.stringify can emit "</script>" if a field (e.g. description) contains
// it, which would terminate the script tag early - escape "<" defensively.
function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function useStorefrontSeo(getSite: () => TenantSite | null) {
  const route = useRoute()
  const requestURL = useRequestURL()

  useSeoMeta({
    title: () => getSite()?.name || 'Order Online',
    description: () => getSite()?.description || undefined,
    ogTitle: () => getSite()?.name || undefined,
    ogDescription: () => getSite()?.description || undefined,
    ogImage: () => getSite()?.coverImageUrl || getSite()?.logoUrl || undefined,
    twitterCard: 'summary_large_image',
  })

  useHead(() => {
    const site = getSite()
    if (!site) return {}

    const canonical = `${requestURL.origin}${route.path}`
    const primaryBranch = site.branches[0]

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: site.name,
      description: site.description || undefined,
      image: site.coverImageUrl || site.logoUrl || undefined,
      servesCuisine: site.cuisineTags.length ? site.cuisineTags : undefined,
      address: primaryBranch
        ? {
            '@type': 'PostalAddress',
            streetAddress: primaryBranch.addressLine1,
            addressLocality: primaryBranch.city,
          }
        : undefined,
    }

    return {
      link: [{ rel: 'canonical', href: canonical }],
      script: [{ type: 'application/ld+json', innerHTML: safeJsonLd(jsonLd) }],
    }
  })
}
