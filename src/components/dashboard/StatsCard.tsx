import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/cn'

type Props = {
  label: string
  value: string
  icon: LucideIcon
  iconClassName: string
}

export function StatsCard({ label, value, icon: Icon, iconClassName }: Props) {
  return (
    <div className="flex h-[54px] w-full max-w-[160px] items-center gap-2.5 rounded-lg border border-border bg-surface px-2.5 py-2 lg:h-20 lg:max-w-none lg:min-w-0 lg:flex-1 lg:gap-3 lg:px-4 lg:py-3">
      <div
        className={cn(
          'flex size-[33px] shrink-0 items-center justify-center rounded-lg lg:size-[50px]',
          iconClassName,
        )}
      >
        <Icon className="size-[21px] lg:size-8" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 lg:gap-1">
        <p className="truncate text-[10px] font-normal leading-none text-foreground lg:text-[19px]">
          {label}
        </p>
        <p className="truncate text-[15px] font-medium leading-none text-foreground lg:text-2xl lg:font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}
