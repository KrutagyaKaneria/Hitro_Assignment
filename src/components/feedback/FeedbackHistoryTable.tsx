import type { FeedbackEntry } from '@/types/feedback'
import {
  formatFeedbackDescriptionPreview,
  formatFeedbackHistoryDate,
  formatFeedbackHistoryTime,
  formatFeedbackTitle,
} from '@/utils/formatFeedbackHistory'

type Props = {
  entries: FeedbackEntry[]
}

export function FeedbackHistoryTable({ entries }: Props) {
  return (
    <div className="hidden w-full overflow-hidden rounded-2xl border border-black/50 lg:block">
      <div className="rounded-t-2xl border-b border-black/50 bg-[#f8f9fd] px-4 py-3">
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,0.9fr)_minmax(0,2.4fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] gap-4 text-[14px] font-medium leading-none tracking-[0.3px] text-black/40">
          <span>Title</span>
          <span>Rating</span>
          <span>Description</span>
          <span>Date</span>
          <span className="text-right">Time</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-b-2xl border-x border-b border-black/50 bg-surface px-4 py-3">
        {entries.map((row) => (
          <div
            key={row.id}
            className="grid min-h-7 grid-cols-[minmax(0,2fr)_minmax(0,0.9fr)_minmax(0,2.4fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] gap-4 text-[14px] font-normal leading-normal tracking-[0.3px] text-foreground"
          >
            <span className="truncate">
              {formatFeedbackTitle(row.message)}
            </span>
            <span className="tabular-nums">{row.rating}/5</span>
            <span className="truncate">
              {formatFeedbackDescriptionPreview(row.message)}
            </span>
            <span className="whitespace-nowrap">
              {formatFeedbackHistoryDate(row.createdAt)}
            </span>
            <span className="text-right tabular-nums">
              {formatFeedbackHistoryTime(row.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
