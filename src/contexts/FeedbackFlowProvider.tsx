import type { ReactNode } from 'react'

import { FeedbackFlowContext } from '@/contexts/feedbackFlowContext'
import { useFeedbackModal } from '@/hooks/useFeedbackModal'

export function FeedbackFlowProvider({ children }: { children: ReactNode }) {
  const api = useFeedbackModal()
  return (
    <FeedbackFlowContext.Provider value={api}>
      {children}
    </FeedbackFlowContext.Provider>
  )
}
