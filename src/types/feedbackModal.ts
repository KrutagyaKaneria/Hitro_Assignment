import type { Dispatch, SetStateAction } from 'react'

import type { FeedbackFlowStep, FeedbackPolarity } from '@/types/feedback'

export type FeedbackModalApi = {
  step: FeedbackFlowStep
  rating: number
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  polarity: FeedbackPolarity | null
  open: () => void
  close: () => void
  selectRating: (value: number) => void
  goToDetail: () => void
  backToRating: () => void
  submitDetail: () => void
  finishAcknowledgement: () => void
}
