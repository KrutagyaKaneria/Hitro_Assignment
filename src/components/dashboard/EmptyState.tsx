import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type Props = {
  icon?: LucideIcon
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-center lg:gap-6',
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground lg:size-12">
          <Icon className="size-5 lg:size-6" aria-hidden />
        </span>
      ) : null}
      <h3 className="text-base font-semibold leading-tight text-foreground lg:text-lg">
        {title}
      </h3>
      <p className="max-w-xs text-xs leading-relaxed text-muted-foreground lg:text-sm lg:max-w-sm">
        {description}
      </p>
      {action ? <div className="mt-2 lg:mt-4">{action}</div> : null}
    </div>
  )
}
