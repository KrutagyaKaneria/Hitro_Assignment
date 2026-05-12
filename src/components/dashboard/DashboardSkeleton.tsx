import { PAGE_SHELL_CLASS } from '@/constants/pageShell'
import { cn } from '@/utils/cn'

function StatSkeleton() {
  return (
    <div className="flex h-[54px] w-full max-w-[160px] items-center gap-2.5 rounded-lg border border-border bg-surface px-2.5 py-2 lg:h-20 lg:max-w-[240px] lg:gap-3 lg:px-4">
      <div className="size-[33px] shrink-0 animate-pulse rounded-lg bg-muted lg:size-[50px]" />
      <div className="flex-1 space-y-2">
        <div className="h-2.5 w-16 animate-pulse rounded bg-muted lg:h-3 lg:w-24" />
        <div className="h-4 w-10 animate-pulse rounded bg-muted lg:h-7 lg:w-14" />
      </div>
    </div>
  )
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-[41px] gap-y-2.5 lg:flex lg:w-full lg:max-w-[1002px] lg:gap-[14px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatSkeleton key={i} />
      ))}
    </div>
  )
}

export function DashboardRecentSkeleton() {
  return (
    <div className="mx-auto mt-8 w-full max-w-[364px] space-y-4 lg:mt-10 lg:max-w-[802px]">
      <div className="mx-auto h-4 w-24 animate-pulse rounded bg-muted lg:w-28" />
      <div className="space-y-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex h-12 items-center gap-3 border-b border-border py-2"
          >
            <div className="size-8 shrink-0 animate-pulse rounded bg-muted" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            <div className="h-4 w-14 shrink-0 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardPageSkeleton() {
  return (
    <div className={cn(PAGE_SHELL_CLASS, 'animate-pulse space-y-6')}>
      <div className="h-6 w-2/3 rounded bg-muted lg:h-8" />
      <div className="h-4 w-1/2 rounded bg-muted" />
      <DashboardStatsSkeleton />
      <DashboardRecentSkeleton />
    </div>
  )
}
