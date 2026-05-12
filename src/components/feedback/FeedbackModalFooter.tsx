import { ArrowLeft } from 'lucide-react'

import { cn } from '@/utils/cn'

type Props = {
  onBack: () => void
  onSubmit?: () => void
  submitDisabled?: boolean
  submitLabel?: string
  backLabel?: string
}

export function FeedbackModalFooter({
  onBack,
  onSubmit,
  submitDisabled,
  submitLabel = 'Submit',
  backLabel = 'Back',
}: Props) {
  return (
    <footer className="flex min-h-[34px] w-[506px] max-w-full items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-w-[84px] items-center justify-center gap-[10px] rounded-[4px] border border-black/50 bg-surface px-[14px] py-2 text-[12px] font-medium leading-normal tracking-[0.3px] text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-[13px] shrink-0" aria-hidden />
        {backLabel}
      </button>
      <button
        type="button"
        disabled={submitDisabled}
        onClick={onSubmit}
        className={cn(
          'inline-flex items-center justify-center rounded-[4px] bg-black/50 px-[14px] py-2 text-[12px] font-medium leading-normal tracking-[0.3px] text-white transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-45',
        )}
      >
        {submitLabel}
      </button>
    </footer>
  )
}
