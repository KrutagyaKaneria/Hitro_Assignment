import { FeedbackModalFooter } from '@/components/feedback/FeedbackModalFooter'
import { FeedbackModalHeader } from '@/components/feedback/FeedbackModalHeader'
import { FeedbackStarRow } from '@/components/feedback/FeedbackStarRow'

type Props = {
  rating: number
  onRatingChange: (n: number) => void
  onCancel: () => void
  onContinue: () => void
}

export function RatingModal({
  rating,
  onRatingChange,
  onCancel,
  onContinue,
}: Props) {
  const canContinue = rating >= 1

  return (
    <div className="flex w-[506px] max-w-full flex-col gap-10">
      <FeedbackModalHeader />
      <FeedbackStarRow value={rating} onChange={onRatingChange} />
      <FeedbackModalFooter
        onBack={onCancel}
        onSubmit={onContinue}
        submitDisabled={!canContinue}
        submitLabel="Submit"
      />
    </div>
  )
}
