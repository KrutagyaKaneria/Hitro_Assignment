import { EmptyFeedbackState } from '@/components/feedback/EmptyFeedbackState'

type Props = {
  onGiveFeedback: () => void
}

/** Desktop empty — keeps header row per Figma `feedback history/empty state`. */
export function FeedbackHistoryEmptyTable({ onGiveFeedback }: Props) {
  return (
    <div className="hidden w-full max-w-[1010px] overflow-hidden rounded-2xl border border-black/50 lg:block">
      <div className="rounded-t-2xl border-b border-black/50 bg-table-header px-4 py-3">
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,0.9fr)_minmax(0,2.4fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] gap-4 text-[14px] font-medium leading-none tracking-[0.3px] text-black/40">
          <span>Title</span>
          <span>Rating</span>
          <span>Description</span>
          <span>Date</span>
          <span className="text-right">Time</span>
        </div>
      </div>
      <div className="rounded-b-2xl border-x border-b border-black/50 bg-surface">
        <EmptyFeedbackState onGiveFeedback={onGiveFeedback} />
      </div>
    </div>
  )
}
