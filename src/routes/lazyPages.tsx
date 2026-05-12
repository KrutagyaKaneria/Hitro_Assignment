import { lazy } from 'react'

export const LazyDashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)

export const LazyFeedbackHistoryPage = lazy(() =>
  import('@/pages/FeedbackHistoryPage').then((m) => ({
    default: m.FeedbackHistoryPage,
  })),
)

export const LazyLoginPage = lazy(() =>
  import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)
