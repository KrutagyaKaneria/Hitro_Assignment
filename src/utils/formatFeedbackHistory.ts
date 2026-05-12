import { format } from 'date-fns'

import { formatCallClock } from '@/utils/formatCallTime'

/** Figma desktop history: `10th May 2026`. */
export function formatFeedbackHistoryDate(iso: string): string {
  return format(new Date(iso), 'do MMMM yyyy')
}

/** Reuses call clock style: `5:00 pm`. */
export function formatFeedbackHistoryTime(iso: string): string {
  return formatCallClock(iso)
}

export function formatFeedbackTitle(message: string): string {
  const line = message.split(/\r?\n/).find((l) => l.trim()) ?? message
  const t = line.trim()
  if (!t) return 'Feedback'
  return t.length > 48 ? `${t.slice(0, 45)}…` : t
}

export function formatFeedbackDescriptionPreview(message: string): string {
  const t = message.trim()
  if (!t) return '-'
  const dash = t.startsWith('-') ? '' : '- '
  const body = t.length > 80 ? `${t.slice(0, 77)}…` : t
  return `${dash}${body}`
}
