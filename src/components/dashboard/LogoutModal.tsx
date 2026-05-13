import { AnimatePresence, motion } from 'framer-motion'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/useAuthStore'

type Props = {
  open: boolean
  onClose: () => void
}

export function LogoutModal({ open, onClose }: Props) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  const handleLogout = () => {
    queryClient.removeQueries({ queryKey: ['auth'] })
    queryClient.removeQueries({ queryKey: ['call-sessions'] })
    clearAuth()
    navigate('/login', { replace: true })
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="logout-modal-root"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Dismiss logout dialog"
            className="absolute inset-0 bg-black/[0.32]"
            onClick={onClose}
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
            className="relative z-[101] w-[min(100vw-2rem,380px)] rounded-lg bg-surface shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]"
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
          >
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <h2
                  id="logout-modal-title"
                  className="text-base font-semibold leading-tight text-foreground"
                >
                  Leaving already?
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  You can go back in anytime to continue your meetings with Hintro.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1 h-9 rounded-md border border-border text-sm font-normal"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleLogout}
                  className="flex-1 h-9 rounded-md bg-foreground text-surface text-sm font-normal hover:bg-foreground/90"
                >
                  Log out
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
