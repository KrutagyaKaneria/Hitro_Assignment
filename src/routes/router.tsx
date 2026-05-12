import { createBrowserRouter, Navigate } from 'react-router-dom'

import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { RequireAuth } from '@/components/layout/RequireAuth'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { FeedbackHistoryPage } from '@/pages/FeedbackHistoryPage'
import { LoginPage } from '@/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <DashboardShell />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'feedback-history', element: <FeedbackHistoryPage /> },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
