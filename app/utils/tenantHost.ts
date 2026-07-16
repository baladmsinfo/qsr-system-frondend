// Resolves a tenant slug from the request hostname so a single deployment can
// serve unlimited storefronts (abc.<apexDomain> -> slug "abc"), while the bare
// apex/www domain and any unrecognized host keep the existing QR-ordering app
// behavior (no tenant).
export function resolveTenantSlugFromHost(host: string | null | undefined, apexDomain: string | null | undefined): string | null {
  if (!host) return null

  const hostname = (host.split(':')[0] || '').toLowerCase().trim()
  if (!hostname) return null

  const apex = apexDomain?.toLowerCase().trim()
  if (apex) {
    if (hostname === apex || hostname === `www.${apex}`) return null
    if (hostname.endsWith(`.${apex}`)) {
      const prefix = hostname.slice(0, -(apex.length + 1))
      return prefix.split('.')[0] || null
    }
    return null
  }

  // No apex domain configured (e.g. local dev) - fall back to a naive rule:
  // "<slug>.localhost" resolves a tenant, everything else (localhost, bare
  // 2-label domains, IP addresses) does not.
  if (hostname === 'localhost' || /^[\d.]+$/.test(hostname)) return null
  if (hostname.endsWith('.localhost')) return hostname.slice(0, -'.localhost'.length).split('.')[0] || null

  const labels = hostname.split('.')
  if (labels.length <= 2) return null
  return labels[0] || null
}
