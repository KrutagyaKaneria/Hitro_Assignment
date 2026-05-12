import type { FeedbackEntry } from '@/types/feedback'
import { Star } from 'lucide-react'
import {
  formatFeedbackDescriptionPreview,
  formatFeedbackHistoryDate,
  formatFeedbackHistoryTime,
  formatFeedbackTitle,
} from '@/utils/formatFeedbackHistory'

type Props = {
  entry: FeedbackEntry
}

export function FeedbackHistoryCard({ entry }: Props) {
  const dateLabel = formatFeedbackHistoryDate(entry.createdAt)
  const timeLabel = formatFeedbackHistoryTime(entry.createdAt)

  return (
    <article className="rounded-lg border border-[#f0f0f0] bg-surface px-3 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="text-[14px] font-medium leading-normal tracking-[0.3px] text-foreground">
            {formatFeedbackTitle(entry.message)}
          </h3>
          <p className="text-[10px] font-medium leading-normal tracking-[0.3px] text-black/40">
            {formatFeedbackDescriptionPreview(entry.message)}
          </p>
          <p className="text-[10px] font-medium leading-normal tracking-[0.3px]">
            <time dateTime={entry.createdAt}>
              <span className="text-[#6686ff]">{dateLabel}</span>
              <span className="text-black/40">{'  .  '}</span>
              <span className="text-black/40">{timeLabel}</span>
            </time>
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={n <= entry.rating ? 'size-4 fill-amber-400 text-amber-400' : 'size-4 fill-zinc-100 text-zinc-200'}
              aria-hidden
            />
          ))}
        </div>
      </div>
    </article>
  )
}
