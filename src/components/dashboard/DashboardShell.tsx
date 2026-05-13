import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { MobileNavbar } from '@/components/dashboard/MobileNavbar'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { FeedbackModal } from '@/components/feedback/FeedbackModal'
import { FeedbackFlowProvider } from '@/contexts/FeedbackFlowProvider'
import { useFeedbackFlow } from '@/contexts/useFeedbackFlow'
import { useAuthHydration } from '@/hooks/useAuthHydration'
import { useDashboardQueries } from '@/hooks/useDashboardQueries'
import { useAuthStore } from '@/store/useAuthStore'
import { getInitials } from '@/utils/getInitials'

export function DashboardShell() {
  return (
    <FeedbackFlowProvider>
      <DashboardShellInner />
    </FeedbackFlowProvider>
  )
}

function DashboardShellInner() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)
  const hydrated = useAuthHydration()
  const userId = useAuthStore((s) => s.userId)
  const enabled = hydrated && !!userId

  const { profile, dashboard } = useDashboardQueries(userId, enabled)
  const { open: openFeedback } = useFeedbackFlow()

  const title = location.pathname.startsWith('/feedback-history')
    ? 'Feedback History'
    : 'Dashboard'

  const initials = getInitials(
    profile.data?.firstName,
    profile.data?.lastName,
  )

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <div className="flex min-h-dvh bg-background">
      <div className="hidden shrink-0 lg:block lg:w-[262px]" aria-hidden />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[262px] border-r border-border bg-surface lg:block">
        <Sidebar
          usage={dashboard.data?.usage}
          onOpenFeedback={openFeedback}
        />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-nav-layer"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/32 transition-opacity duration-200"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="absolute left-0 top-0 flex h-full w-[262px] max-w-[85vw] flex-col border-r border-border bg-surface shadow-xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            >
              <Sidebar
                compact
                usage={dashboard.data?.usage}
                onOpenFeedback={openFeedback}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col bg-background">
        <MobileNavbar
          title={title}
          initials={initials}
          menuOpen={mobileOpen}
          onOpenMenu={() => setMobileOpen(true)}
        />
        <DashboardHeader title={title} initials={initials} />
        <main className="flex-1 bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="min-h-0"
              initial={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.22,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <FeedbackModal />
    </div>
  )
}
