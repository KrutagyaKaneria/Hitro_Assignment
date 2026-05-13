import { MoreVertical } from 'lucide-react'

import type { CallSession } from '@/types/api'
import { formatCallClock } from '@/utils/formatCallTime'
import { getInitials } from '@/utils/getInitials'

type Props = {
  session: CallSession
}

export function CallRow({ session }: Props) {
  const title = session.description || 'Call'
  const subtitle = session.client
  const initial =
    session.client?.trim()?.[0]?.toUpperCase() ??
    session.description?.trim()?.[0]?.toUpperCase() ??
    '?'
  const time = formatCallClock(session.started_at)

  return (
    <>
      <div className="flex items-center gap-3 border-b border-border py-3.5 last:border-b-0 lg:hidden">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-violet-600 text-sm font-semibold leading-none text-white">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight text-foreground">{title}</p>
          <div className="mt-1 flex items-center gap-1">
            {session.participants?.slice(0, 3).map((p, i) => (
              <div
                key={i}
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-300 text-[9px] font-semibold text-slate-700"
                title={p.name}
              >
                {getInitials(p.name)}
              </div>
            ))}
            {session.participants && session.participants.length > 3 && (
              <span className="text-xs text-muted-foreground">+{session.participants.length - 3}</span>
            )}
          </div>
          {subtitle && subtitle !== title ? (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <time
            className="text-xs font-normal leading-none text-foreground"
            dateTime={session.started_at}
          >
            {time}
          </time>
          <button
            type="button"
            className="rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Call actions"
          >
            <MoreVertical className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="hidden h-12 items-center gap-4 border-b border-border last:border-b-0 lg:flex lg:w-full">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-violet-600 text-base font-semibold text-white">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight text-foreground">{title}</p>
          <div className="flex items-center gap-1">
            {session.participants?.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-300 text-[9px] font-semibold text-slate-700"
                title={p.name}
              >
                {getInitials(p.name)}
              </div>
            ))}
            {session.participants && session.participants.length > 4 && (
              <span className="text-xs text-muted-foreground">+{session.participants.length - 4}</span>
            )}
          </div>
          {subtitle && subtitle !== title ? (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <time
            className="text-sm font-normal leading-none text-foreground"
            dateTime={session.started_at}
          >
            {time}
          </time>
          <button
            type="button"
            className="rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Call actions"
          >
            <MoreVertical className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </>
  )
}

export function CallRowSkeleton() {
  return (
    <>
      <div className="flex gap-3 border-b border-border py-3 lg:hidden">
        <div className="size-8 shrink-0 animate-pulse rounded bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="hidden h-[35px] items-center gap-4 border-b border-border lg:flex">
        <div className="size-8 shrink-0 animate-pulse rounded bg-muted" />
        <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 shrink-0 animate-pulse rounded bg-muted" />
      </div>
    </>
  )
}
