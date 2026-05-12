import { MoreVertical } from 'lucide-react'

import type { CallSession } from '@/types/api'
import { formatCallClock } from '@/utils/formatCallTime'

type Props = {
  session: CallSession
}

function ParticipantChip({ name }: { name: string }) {
  const letter = name.trim()[0]?.toUpperCase() ?? '?'
  return (
    <span
      className="inline-flex size-[10px] items-center justify-center rounded-full border border-surface bg-muted text-[6px] font-medium text-foreground ring-1 ring-border lg:size-2.5 lg:text-[8px]"
      title={name}
    >
      {letter}
    </span>
  )
}

export function CallRow({ session }: Props) {
  const title = session.description || 'Call'
  const subtitle = session.client
  const initial =
    session.client?.trim()?.[0]?.toUpperCase() ??
    session.description?.trim()?.[0]?.toUpperCase() ??
    '?'
  const time = formatCallClock(session.started_at)
  const participants = session.participants ?? []

  return (
    <>
      <div className="flex gap-3 border-b border-border py-3 last:border-b-0 lg:hidden">
        <div className="flex size-[29px] shrink-0 items-center justify-center rounded bg-violet-600 text-[17px] font-medium leading-none text-white">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium leading-tight text-foreground">{title}</p>
          {subtitle && subtitle !== title ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
          <div className="mt-2 flex items-center pl-0.5">
            <div className="flex -space-x-1.5">
              {participants.slice(0, 3).map((p, i) => (
                <ParticipantChip key={`${p.name}-m-${i}`} name={p.name} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
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
            <MoreVertical className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="hidden h-[35px] items-center gap-4 border-b border-border last:border-b-0 lg:flex lg:w-full lg:max-w-[790px]">
        <div className="flex size-8 shrink-0 items-center justify-center rounded bg-violet-600 text-sm font-medium text-white">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight text-foreground">{title}</p>
          <div className="mt-1 flex items-center">
            <div className="flex -space-x-1.5">
              {participants.slice(0, 3).map((p, i) => (
                <ParticipantChip key={`${p.name}-d-${i}`} name={p.name} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <time
            className="text-sm font-normal tabular-nums text-foreground"
            dateTime={session.started_at}
          >
            {time}
          </time>
          <button
            type="button"
            className="rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Call actions"
          >
            <MoreVertical className="size-3.5" aria-hidden />
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
