import { format } from 'date-fns'

import type { CallSession } from '@/types/api'

import { formatCallDayHeading } from '@/utils/formatCallTime'

export type CallDayGroup = {
  key: string
  heading: string
  sessions: CallSession[]
}

/** Groups by local calendar day, newest days first; sessions newest-first within day. */
export function groupCallSessionsByDay(
  sessions: CallSession[],
): CallDayGroup[] {
  const sorted = [...sessions].sort(
    (a, b) =>
      new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
  )

  const map = new Map<string, CallSession[]>()
  for (const s of sorted) {
    const d = new Date(s.started_at)
    const key = format(d, 'yyyy-MM-dd')
    const list = map.get(key)
    if (list) list.push(s)
    else map.set(key, [s])
  }

  const keys = [...map.keys()].sort((a, b) => b.localeCompare(a))

  return keys.map((key) => {
    const first = map.get(key)![0]
    return {
      key,
      heading: formatCallDayHeading(first.started_at),
      sessions: map.get(key)!,
    }
  })
}
