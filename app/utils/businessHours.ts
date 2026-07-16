// Branch hours have no timezone field in the schema, so this compares against
// the caller's local clock - correct as long as visitors and the branch share
// a timezone (true for this app's single-country deployments), not a general
// multi-timezone solution.
function parseHm(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim())
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2])
  return hours * 60 + minutes
}

export function isOpenNow(openingTime: string | null, closingTime: string | null, now: Date = new Date()): boolean | null {
  if (!openingTime || !closingTime) return null

  const open = parseHm(openingTime)
  const close = parseHm(closingTime)
  if (open === null || close === null) return null

  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  // Overnight hours (e.g. 18:00 - 02:00) wrap past midnight.
  if (close <= open) return nowMinutes >= open || nowMinutes < close
  return nowMinutes >= open && nowMinutes < close
}
