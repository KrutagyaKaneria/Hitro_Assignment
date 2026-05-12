import { Calendar, CalendarDays, Clock, PieChart, Sparkles } from 'lucide-react'

import { CallsList } from '@/components/dashboard/CallsList'
import { DashboardErrorBanner } from '@/components/dashboard/DashboardErrorBanner'
import {
  DashboardPageSkeleton,
  DashboardRecentSkeleton,
  DashboardStatsSkeleton,
} from '@/components/dashboard/DashboardSkeleton'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { GreetingBanner } from '@/components/dashboard/GreetingBanner'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { Button } from '@/components/ui/Button'
import { useAuthHydration } from '@/hooks/useAuthHydration'
import { useDashboardQueries } from '@/hooks/useDashboardQueries'
import { useAuthStore } from '@/store/useAuthStore'
import { formatDurationSeconds } from '@/utils/formatDuration'
import { groupCallSessionsByDay } from '@/utils/groupCallSessionsByDay'
import { getErrorMessage } from '@/utils/errorMessage'
import { formatLastSessionRelative } from '@/utils/lastSessionLabel'

export function DashboardPage() {
  const hydrated = useAuthHydration()
  const userId = useAuthStore((s) => s.userId)
  const enabled = hydrated && !!userId

  const { profile, dashboard, stats, sessions, isLoading, isError, refetchAll } =
    useDashboardQueries(enabled)

  const err =
    profile.error ?? dashboard.error ?? stats.error ?? sessions.error

  if (!enabled) return null

  if (isLoading) {
    return <DashboardPageSkeleton />
  }

  const firstName = profile.data?.firstName ?? 'there'
  const groups = groupCallSessionsByDay(sessions.data?.callSessions ?? [])
  const hasCalls = (sessions.data?.callSessions?.length ?? 0) > 0

  const totalSessions = String(stats.data?.totalSessions ?? 0)
  const avg = formatDurationSeconds(stats.data?.averageDuration ?? 0)
  const aiCount = stats.data?.totalAIInteractions ?? 0
  const aiLabel = aiCount === 0 ? '0' : `${aiCount} times`
  const lastLabel = formatLastSessionRelative(stats.data?.lastSession ?? [])

  return (
    <div className="w-full px-5 pb-12 pt-6 lg:px-[83px] lg:pb-16 lg:pt-10">
      {isError && err ? (
        <DashboardErrorBanner
          message={getErrorMessage(err)}
          onRetry={refetchAll}
        />
      ) : null}

      <GreetingBanner firstName={firstName} />

      <div className="mt-6 lg:mt-10">
        {stats.isPending && !stats.data ? (
          <DashboardStatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 justify-items-stretch gap-x-[41px] gap-y-2.5 lg:flex lg:max-w-[1002px] lg:gap-[14px]">
            <StatsCard
              label="Total Sessions"
              value={totalSessions}
              icon={PieChart}
              iconClassName="bg-rose-100 text-rose-600"
            />
            <StatsCard
              label="Average Duration"
              value={avg}
              icon={Clock}
              iconClassName="bg-cyan-100 text-cyan-600"
            />
            <StatsCard
              label="AI Used"
              value={aiLabel}
              icon={Sparkles}
              iconClassName="bg-emerald-100 text-emerald-600"
            />
            <StatsCard
              label="Last Session"
              value={lastLabel}
              icon={CalendarDays}
              iconClassName="bg-violet-100 text-violet-600"
            />
          </div>
        )}
      </div>

      <section
        className="mx-auto mt-10 w-full max-w-[364px] lg:mt-12 lg:max-w-[802px]"
        aria-labelledby="recent-calls-heading"
      >
        <h2
          id="recent-calls-heading"
          className="mb-6 text-center text-[15px] font-normal leading-none text-foreground lg:mb-8 lg:text-[19px]"
        >
          Recent calls
        </h2>

        {sessions.isPending && !sessions.data ? (
          <DashboardRecentSkeleton />
        ) : !hasCalls ? (
          <div className="rounded-lg border border-border bg-surface px-4 py-10 lg:py-12">
            <EmptyState
              icon={Calendar}
              title="No Recent Calls"
              description="Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro."
              action={
                <Button
                  type="button"
                  variant="secondary"
                  className="h-6 rounded-md border border-border px-2.5 text-xs font-normal lg:h-6 lg:px-2.5 lg:text-xs"
                >
                  Start a Call
                </Button>
              }
            />
          </div>
        ) : (
          <CallsList groups={groups} />
        )}
      </section>
    </div>
  )
}
