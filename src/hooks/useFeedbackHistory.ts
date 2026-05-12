import { useMemo } from 'react'

import { useFeedbackStorage } from '@/hooks/useFeedbackStorage'

export function useFeedbackHistory() {
  const { entries, append } = useFeedbackStorage()

  const sorted = useMemo(
    () =>
      [...entries].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [entries],
  )

  return {
    entries: sorted,
    append,
    hasEntries: sorted.length > 0,
  }
}
