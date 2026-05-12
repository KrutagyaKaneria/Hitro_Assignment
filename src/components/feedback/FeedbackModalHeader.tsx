type Props = {
  title?: string
  subtitle?: string
  titleId?: string
}

export function FeedbackModalHeader({
  title = 'Give Feedback',
  subtitle = 'Describe your experience using Hintro…',
  titleId = 'feedback-modal-title',
}: Props) {
  return (
    <header className="w-[506px] max-w-full space-y-[2px]">
      <h2
        id={titleId}
        className="text-[20px] font-medium leading-normal tracking-[0.3px] text-foreground"
      >
        {title}
      </h2>
      <p className="text-[12px] font-normal leading-normal tracking-[0.3px] text-black/40">
        {subtitle}
      </p>
    </header>
  )
}
