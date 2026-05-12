import { formatDistanceToNowStrict } from 'date-fns'

/** Picks the most recent ISO timestamp from API `lastSession` list. */
export function pickLatestIso(isoList: string[]): string | null {
  if (!isoList.length) return null
  let best = isoList[0]
  let bestMs = Date.parse(best)
  for (const iso of isoList.slice(1)) {
    const ms = Date.parse(iso)
    if (ms > bestMs) {
      best = iso
      bestMs = ms
    }
  }
  return Number.isFinite(bestMs) ? best : null
}

/** e.g. `2 days ago` to mirror dashboard copy. */
export function formatRelativeFromIso(iso: string | null): string {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'
  return formatDistanceToNowStrict(d, { addSuffix: true })
}
