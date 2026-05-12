import { Play, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

type Props = {
  title: string
  initials?: string
  className?: string
}

export function DashboardHeader({ title, initials, className }: Props) {
  return (
    <header
      className={cn(
        'hidden h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-6 lg:flex lg:pl-12 lg:pr-8',
        className,
      )}
    >
      <h1 className="text-[29px] font-normal leading-none tracking-tight text-foreground">
        {title}
      </h1>
      <div className="flex items-center gap-6">
        <Button
          type="button"
          variant="secondary"
          className="h-8 gap-2 rounded-md border border-border bg-surface px-3 text-[15px] font-normal shadow-none"
        >
          <Play className="size-5 fill-foreground text-foreground" aria-hidden />
          Watch Tutorial
        </Button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={initials ? `Account menu (${initials})` : 'Account menu'}
        >
          <span className="flex size-[35px] items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-foreground">
            {initials ?? '—'}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden />
        </button>
      </div>
    </header>
  )
}
