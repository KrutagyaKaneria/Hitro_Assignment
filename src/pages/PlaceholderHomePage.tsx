import { Link } from 'react-router-dom'

import { useAuthStore } from '@/store/useAuthStore'

export function PlaceholderHomePage() {
  const userId = useAuthStore((s) => s.userId)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">Hintro</h1>
      <p className="text-muted-foreground">
        Dashboard shell will be added in the next phase. You are signed in as{' '}
        <span className="font-medium text-foreground">{userId ?? '—'}</span>.
      </p>
      <div className="flex flex-wrap gap-3">
        {!userId ? (
          <Link
            to="/login"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Go to login
          </Link>
        ) : (
          <>
            <button
              type="button"
              onClick={() => clearAuth()}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium"
            >
              Clear session
            </button>
            <Link
              to="/login"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium"
            >
              Login again
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
