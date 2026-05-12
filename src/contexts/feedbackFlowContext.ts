import { createContext } from 'react'

import type { FeedbackModalApi } from '@/types/feedbackModal'

export const FeedbackFlowContext = createContext<FeedbackModalApi | null>(null)
