import { useQuery } from '@tanstack/react-query'

import { fetchAuthDashboard, fetchAuthProfile } from '@/api/auth'
import { fetchCallSessions, fetchCallStats } from '@/api/callSessions'
import { queryKeys } from '@/constants/queryKeys'

export function useDashboardQueries(userId: string | null, enabled: boolean) {
  const queryEnabled = enabled && !!userId

  const profile = useQuery({
    queryKey: queryKeys.profile(userId ?? 'anonymous'),
    queryFn: fetchAuthProfile,
    enabled: queryEnabled,
  })

  const dashboard = useQuery({
    queryKey: queryKeys.dashboard(userId ?? 'anonymous'),
    queryFn: fetchAuthDashboard,
    enabled: queryEnabled,
  })

  const stats = useQuery({
    queryKey: queryKeys.callStats(userId ?? 'anonymous'),
    queryFn: fetchCallStats,
    enabled: queryEnabled,
  })

  const sessions = useQuery({
    queryKey: queryKeys.callSessions(userId ?? 'anonymous', 10),
    queryFn: () => fetchCallSessions(10),
    enabled: queryEnabled,
  })

  const refetchAll = () => {
    void profile.refetch()
    void dashboard.refetch()
    void stats.refetch()
    void sessions.refetch()
  }

  const isLoading =
    profile.isPending ||
    dashboard.isPending ||
    stats.isPending ||
    sessions.isPending

  const isError =
    profile.isError ||
    dashboard.isError ||
    stats.isError ||
    sessions.isError

  return {
    profile,
    dashboard,
    stats,
    sessions,
    isLoading,
    isError,
    refetchAll,
  }
}
