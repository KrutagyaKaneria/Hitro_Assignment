import { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DashboardShell } from '@/components/dashboard/DashboardShell'
import {
  DashboardRouteFallback,
  MinimalRouteFallback,
} from '@/components/layout/RouteFallback'
import { RequireAuth } from '@/components/layout/RequireAuth'
import { AuthLayout } from '@/layouts/AuthLayout'
import {
  LazyDashboardPage,
  LazyFeedbackHistoryPage,
  LazyLoginPage,
} from '@/routes/lazyPages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <DashboardShell />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<DashboardRouteFallback />}>
            <LazyDashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'feedback-history',
        element: (
          <Suspense fallback={<DashboardRouteFallback />}>
            <LazyFeedbackHistoryPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Suspense fallback={<MinimalRouteFallback />}>
          <LazyLoginPage />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
