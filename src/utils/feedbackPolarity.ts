import type { FeedbackPolarity } from '@/types/feedback'

/** Figma branch labels: 1–3 negative, 4–5 positive. */
export function polarityFromRating(rating: number): FeedbackPolarity {
  return rating <= 3 ? 'negative' : 'positive'
}
