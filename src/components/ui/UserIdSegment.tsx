import { cn } from '@/utils/cn'

import type { UserId } from '@/types/user'

type Props = {
  value: UserId
  onChange: (id: UserId) => void
  className?: string
}

const options: { id: UserId; label: string; description: string }[] = [
  { id: 'u1', label: 'u1', description: 'Empty data' },
  { id: 'u2', label: 'u2', description: 'Populated data' },
]

export function UserIdSegment({ value, onChange, className }: Props) {
  return (
    <fieldset className={cn('space-y-2', className)}>
      <legend className="text-sm font-medium text-foreground">
        Demo account
      </legend>
      <div className="flex gap-2">
        {options.map((opt) => {
          const selected = value === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt.id)}
              className={cn(
                'flex-1 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                selected
                  ? 'border-foreground bg-foreground text-primary-foreground'
                  : 'border-border bg-surface text-foreground hover:bg-muted',
              )}
            >
              <span className="block font-semibold">{opt.label}</span>
              <span
                className={cn(
                  'mt-0.5 block text-xs',
                  selected ? 'text-primary-foreground/80' : 'text-muted-foreground',
                )}
              >
                {opt.description}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
