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
    <div className="w-full flex flex-col items-center gap-2 rounded-lg border border-border bg-surface px-3 py-3 text-center transition-shadow duration-200 hover:shadow-sm lg:flex-1 lg:h-20 lg:flex-row lg:items-center lg:justify-start lg:gap-3 lg:px-4 lg:py-3">
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-lg size-9 lg:size-12',
          iconClassName,
        )}
      >
        <Icon className="size-5 lg:size-6" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-0.5 lg:gap-1">
        <p className="text-xs font-normal leading-tight text-foreground lg:text-base lg:leading-tight">
          {label}
        </p>
        <p className="text-sm font-semibold leading-tight text-foreground lg:text-2xl lg:font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}
