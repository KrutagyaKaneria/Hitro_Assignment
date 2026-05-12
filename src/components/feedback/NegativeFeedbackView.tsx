import { FeedbackModalFooter } from '@/components/feedback/FeedbackModalFooter'
import { FeedbackModalHeader } from '@/components/feedback/FeedbackModalHeader'
import { FeedbackStarRow } from '@/components/feedback/FeedbackStarRow'

type Props = {
  rating: number
  onRatingChange: (n: number) => void
  message: string
  onMessageChange: (v: string) => void
  onBack: () => void
  onSubmit: () => void
}

export function NegativeFeedbackView({
  rating,
  onRatingChange,
  message,
  onMessageChange,
  onBack,
  onSubmit,
}: Props) {
  const canSubmit = rating >= 1 && message.trim().length > 0

  return (
    <div className="flex w-[506px] max-w-full flex-col gap-8">
      <FeedbackModalHeader />
      <div className="flex flex-col gap-6">
        <FeedbackStarRow value={rating} onChange={onRatingChange} idPrefix="neg" />
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor="feedback-negative-msg"
            className="text-[12px] font-medium leading-normal tracking-[0.3px] text-black/40"
          >
            What frustrated you or felt confusing?
          </label>
          <textarea
            id="feedback-negative-msg"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            rows={4}
            className="min-h-[121px] w-full resize-y rounded-[4px] border border-[#e3e9ef] bg-surface px-3 py-2.5 text-[14px] leading-normal text-foreground placeholder:text-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            placeholder="Share details…"
          />
        </div>
      </div>
      <FeedbackModalFooter
        onBack={onBack}
        onSubmit={onSubmit}
        submitDisabled={!canSubmit}
      />
    </div>
  )
}
