import { Star, X } from 'lucide-react'

type Props = {
  onClose: () => void
}

export function AcknowledgementModal({ onClose }: Props) {
  return (
    <div className="relative w-full px-8 pb-8 pt-8">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-8 top-8 inline-flex size-8 items-center justify-center rounded-md text-black/40 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Close dialog"
      >
        <X className="size-4" aria-hidden />
      </button>

      <div className="mx-auto flex w-full max-w-[506px] flex-col items-center gap-14">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <Star
            className="size-10 fill-amber-400 text-amber-400"
            strokeWidth={1.25}
            aria-hidden
          />
        </div>
        <div className="flex max-w-[383px] flex-col items-center gap-0.5 text-center">
          <h2
            id="feedback-ack-title"
            className="text-[20px] font-medium leading-normal tracking-[0.3px] text-foreground"
          >
            Thank you for your feedback!!
          </h2>
          <p className="text-[12px] font-normal leading-normal tracking-[0.3px] text-black/40">
            Our team reviews every suggestion to improve AI responses, workflows,
            and overall experience.
          </p>
        </div>
      </div>
    </div>
  )
}
