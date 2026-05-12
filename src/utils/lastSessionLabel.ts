import { formatDistanceToNowStrict } from 'date-fns'

/** Latest timestamp from API `lastSession` strings; `-` if none. */
export function formatLastSessionRelative(isoDates: string[]): string {
  if (!isoDates.length) return '-'
  const times = isoDates
    .map((d) => new Date(d).getTime())
    .filter((t) => !Number.isNaN(t))
  if (!times.length) return '-'
  const latest = new Date(Math.max(...times))
  return formatDistanceToNowStrict(latest, { addSuffix: true })
}
