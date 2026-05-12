import { Star } from 'lucide-react'

import { cn } from '@/utils/cn'

type Props = {
  value: number
  onChange: (rating: number) => void
  /** Allow clearing / changing freely */
  idPrefix?: string
}

export function FeedbackStarRow({ value, onChange, idPrefix = 'star' }: Props) {
  return (
    <div
      className="flex justify-center gap-4 max-[440px]:origin-center max-[440px]:scale-[0.88]"
      role="radiogroup"
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={active}
            id={`${idPrefix}-${n}`}
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded outline-none transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            )}
            onClick={() => onChange(n)}
          >
            <Star
              className={cn(
                'size-10 stroke-[1.25]',
                active
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-zinc-100 text-zinc-200',
              )}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  )
}
