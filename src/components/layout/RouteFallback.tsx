import { DashboardPageSkeleton } from '@/components/dashboard/DashboardSkeleton'

/** Shown while lazy dashboard routes resolve (code-split chunks). */
export function DashboardRouteFallback() {
  return <DashboardPageSkeleton />
}

/** Lightweight fallback for login and small routes. */
export function MinimalRouteFallback() {
  return (
    <div
      className="flex min-h-[45vh] w-full flex-col items-center justify-center gap-3 px-5 py-16"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span
        className="size-8 animate-spin rounded-full border-2 border-border border-t-foreground"
        aria-hidden
      />
      <span className="sr-only">Loading page…</span>
    </div>
  )
}
