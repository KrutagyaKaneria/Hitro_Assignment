import { useContext } from 'react'

import { FeedbackFlowContext } from '@/contexts/feedbackFlowContext'

export function useFeedbackFlow() {
  const ctx = useContext(FeedbackFlowContext)
  if (!ctx) {
    throw new Error('useFeedbackFlow must be used within FeedbackFlowProvider')
  }
  return ctx
}
