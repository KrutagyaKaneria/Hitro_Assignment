export type FeedbackFlowStep = 'closed' | 'rating' | 'detail' | 'ack'

export type FeedbackPolarity = 'positive' | 'negative'

export type FeedbackEntry = {
  id: string
  rating: number
  feedbackType: FeedbackPolarity
  message: string
  createdAt: string
}

export type FeedbackPersistedShape = {
  version: 1
  entries: FeedbackEntry[]
}
