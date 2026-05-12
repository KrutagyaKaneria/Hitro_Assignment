import { useCallback, useMemo, useState } from 'react'

import type { FeedbackFlowStep } from '@/types/feedback'
import type { FeedbackModalApi } from '@/types/feedbackModal'
import { polarityFromRating } from '@/utils/feedbackPolarity'

import { useFeedbackStorage } from '@/hooks/useFeedbackStorage'

export function useFeedbackModal() {
  const { append } = useFeedbackStorage()
  const [step, setStep] = useState<FeedbackFlowStep>('closed')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')

  const open = useCallback(() => {
    setRating(0)
    setMessage('')
    setStep('rating')
  }, [])

  const close = useCallback(() => {
    setStep('closed')
    setRating(0)
    setMessage('')
  }, [])

  const selectRating = useCallback((value: number) => {
    setRating(Math.min(5, Math.max(1, value)))
  }, [])

  const goToDetail = useCallback(() => {
    if (rating < 1) return
    setStep('detail')
  }, [rating])

  const backToRating = useCallback(() => setStep('rating'), [])

  const submitDetail = useCallback(() => {
    if (rating < 1 || !message.trim()) return
    append({
      rating,
      feedbackType: polarityFromRating(rating),
      message: message.trim(),
    })
    setStep('ack')
  }, [append, message, rating])

  const finishAcknowledgement = useCallback(() => {
    close()
  }, [close])

  const polarity = rating > 0 ? polarityFromRating(rating) : null

  return useMemo<FeedbackModalApi>(
    () => ({
      step,
      rating,
      message,
      setMessage,
      polarity,
      open,
      close,
      selectRating,
      goToDetail,
      backToRating,
      submitDetail,
      finishAcknowledgement,
    }),
    [
      backToRating,
      close,
      finishAcknowledgement,
      goToDetail,
      message,
      open,
      polarity,
      rating,
      selectRating,
      step,
      submitDetail,
    ],
  )
}
