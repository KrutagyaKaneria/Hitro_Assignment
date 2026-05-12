import { Button } from '@/components/ui/Button'

type Props = {
  onGiveFeedback: () => void
}

export function EmptyFeedbackState({ onGiveFeedback }: Props) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-[22px] py-14 lg:min-h-[241px] lg:pb-[72px] lg:pt-[67px]">
      <p className="max-w-[298px] text-center text-[14px] font-medium leading-normal tracking-[0.5px] text-foreground">
        No feedbacks yet
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={onGiveFeedback}
        className="h-auto rounded-[4px] border-[0.5px] border-foreground bg-surface px-2.5 py-1.5 text-[10px] font-normal leading-none tracking-[0.5px] hover:bg-muted"
      >
        Give Feedback
      </Button>
    </div>
  )
}
