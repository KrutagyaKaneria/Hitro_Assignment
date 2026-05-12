import { format } from 'date-fns'

/** e.g. `11:00 am` (lowercase am/pm to match Figma). */
export function formatCallClock(iso: string): string {
  const d = new Date(iso)
  return format(d, 'h:mm a').toLowerCase()
}

/** Section heading e.g. `April 29th`. */
export function formatCallDayHeading(iso: string): string {
  const d = new Date(iso)
  return format(d, 'MMMM do')
}
