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
        'flex flex-col items-center justify-center text-center',
        className,
      )}
    >
      {Icon ? (
        <span className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground lg:mb-4 lg:size-[34px]">
          <Icon className="size-4 lg:size-[14px]" aria-hidden />
        </span>
      ) : null}
      <h3 className="text-[17px] font-medium leading-tight text-foreground lg:text-[17px]">
        {title}
      </h3>
      <p className="mt-2 max-w-[302px] text-xs leading-snug text-muted-foreground lg:mt-2 lg:text-sm">
        {description}
      </p>
      {action ? <div className="mt-6 lg:mt-8">{action}</div> : null}
    </div>
  )
}
