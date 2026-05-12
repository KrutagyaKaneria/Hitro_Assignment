import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { STORAGE_KEYS } from '@/constants/storageKeys'
import type { FeedbackEntry, FeedbackPersistedShape } from '@/types/feedback'
import { createFeedbackId } from '@/utils/createFeedbackId'
import { parseFeedbackStorage } from '@/utils/parseFeedbackStorage'

let listeners: Array<() => void> = []

function emit() {
  listeners.forEach((l) => l())
}

function readPersisted(): FeedbackPersistedShape {
  if (typeof window === 'undefined') return { version: 1, entries: [] }
  // Cache the last raw value and parsed object so `getSnapshot` is stable
  // across calls — returning a fresh object every call can trigger
  // infinite update loops when used with `useSyncExternalStore`.
  // We keep these as module-scoped variables so they persist between calls.
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.feedback)
    if (raw === _lastRawFeedback) return _lastParsedFeedback!
    const parsed = parseFeedbackStorage(raw)
    _lastRawFeedback = raw
    _lastParsedFeedback = parsed
    return parsed
  } catch (e) {
    return { version: 1, entries: [] }
  }
}

// module-scoped cache for readPersisted
let _lastRawFeedback: string | null | undefined = undefined
let _lastParsedFeedback: FeedbackPersistedShape = { version: 1, entries: [] }

function writePersisted(next: FeedbackPersistedShape) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.feedback, JSON.stringify(next))
  emit()
}

export function subscribeFeedbackStorage(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

export function useFeedbackStorage() {
  const snapshot = useSyncExternalStore(
    subscribeFeedbackStorage,
    readPersisted,
    () => ({ version: 1 as const, entries: [] }),
  )

  const append = useCallback((entry: Omit<FeedbackEntry, 'id' | 'createdAt'>) => {
    const prev = readPersisted()
    const row: FeedbackEntry = {
      ...entry,
      id: createFeedbackId(),
      createdAt: new Date().toISOString(),
    }
    writePersisted({ version: 1, entries: [row, ...prev.entries] })
    return row
  }, [])

  const clearAll = useCallback(() => {
    writePersisted({ version: 1, entries: [] })
  }, [])

  return useMemo(
    () => ({
      entries: snapshot.entries,
      append,
      clearAll,
    }),
    [append, clearAll, snapshot.entries],
  )
}
