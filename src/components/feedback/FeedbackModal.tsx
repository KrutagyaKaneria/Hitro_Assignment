import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { AcknowledgementModal } from '@/components/feedback/AcknowledgementModal'
import { NegativeFeedbackView } from '@/components/feedback/NegativeFeedbackView'
import { PositiveFeedbackView } from '@/components/feedback/PositiveFeedbackView'
import { RatingModal } from '@/components/feedback/RatingModal'
import { useFeedbackFlow } from '@/contexts/useFeedbackFlow'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/utils/cn'

export function FeedbackModal() {
  const panelRef = useRef<HTMLDivElement>(null)
  const flow = useFeedbackFlow()
  const open = flow.step !== 'closed'

  useFocusTrap(open, panelRef)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (flow.step === 'ack') flow.finishAcknowledgement()
      else if (flow.step === 'detail') flow.backToRating()
      else flow.close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flow, open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="feedback-flow-root"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Dismiss feedback dialog"
            className="absolute inset-0 bg-black/[0.32]"
            onClick={() => {
              if (flow.step === 'ack') flow.finishAcknowledgement()
              else if (flow.step === 'detail') flow.backToRating()
              else flow.close()
            }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={
              flow.step === 'ack' ? 'feedback-ack-title' : 'feedback-modal-title'
            }
            className={cn(
              'relative z-[101] max-h-[min(92vh,520px)] overflow-y-auto rounded-[8px] bg-surface shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] sm:max-h-[min(90vh,560px)]',
              flow.step === 'ack'
                ? 'min-h-0 w-[min(100vw-2rem,557px)] sm:min-h-[364px]'
                : 'w-[min(100vw-2rem,577px)]',
            )}
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {flow.step === 'rating' ? (
                <motion.div
                  key="rating"
                  className="p-8"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <RatingModal
                    rating={flow.rating}
                    onRatingChange={flow.selectRating}
                    onCancel={flow.close}
                    onContinue={flow.goToDetail}
                  />
                </motion.div>
              ) : null}

              {flow.step === 'detail' && flow.polarity === 'negative' ? (
                <motion.div
                  key="detail-neg"
                  className="p-8"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <NegativeFeedbackView
                    rating={flow.rating}
                    onRatingChange={flow.selectRating}
                    message={flow.message}
                    onMessageChange={flow.setMessage}
                    onBack={flow.backToRating}
                    onSubmit={flow.submitDetail}
                  />
                </motion.div>
              ) : null}

              {flow.step === 'detail' && flow.polarity === 'positive' ? (
                <motion.div
                  key="detail-pos"
                  className="p-8"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <PositiveFeedbackView
                    rating={flow.rating}
                    onRatingChange={flow.selectRating}
                    message={flow.message}
                    onMessageChange={flow.setMessage}
                    onBack={flow.backToRating}
                    onSubmit={flow.submitDetail}
                  />
                </motion.div>
              ) : null}

              {flow.step === 'ack' ? (
                <motion.div
                  key="ack"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AcknowledgementModal onClose={flow.finishAcknowledgement} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
