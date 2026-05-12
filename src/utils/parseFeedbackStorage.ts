import type { FeedbackPersistedShape } from '@/types/feedback'

export function parseFeedbackStorage(raw: string | null): FeedbackPersistedShape {
  if (!raw) return { version: 1, entries: [] }
  try {
    const data = JSON.parse(raw) as Partial<FeedbackPersistedShape>
    if (data?.version !== 1 || !Array.isArray(data.entries)) {
      return { version: 1, entries: [] }
    }
    return {
      version: 1,
      entries: data.entries.filter(
        (e) =>
          e &&
          typeof e.id === 'string' &&
          typeof e.rating === 'number' &&
          (e.feedbackType === 'positive' || e.feedbackType === 'negative') &&
          typeof e.message === 'string' &&
          typeof e.createdAt === 'string',
      ),
    }
  } catch {
    return { version: 1, entries: [] }
  }
}
