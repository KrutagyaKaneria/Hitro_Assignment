import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthHydration } from '@/hooks/useAuthHydration'
import { useAuthStore } from '@/store/useAuthStore'

type Props = {
  children: ReactNode
}

export function RequireAuth({ children }: Props) {
  const hydrated = useAuthHydration()
  const userId = useAuthStore((s) => s.userId)
  const location = useLocation()

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-2 bg-background px-4 text-center text-sm text-muted-foreground">
        <span className="inline-block size-6 animate-spin rounded-full border-2 border-border border-t-foreground" />
        Loading workspace…
      </div>
    )
  }

  if (!userId) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    )
  }

  return children
}
