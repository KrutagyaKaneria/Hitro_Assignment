import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/useAuthStore'

type Props = {
  open: boolean
  onClose: () => void
}

export function LogoutModal({ open, onClose }: Props) {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  const handleLogout = () => {
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
            className="relative z-[101] w-[min(100vw-2rem,380px)] rounded-[8px] bg-surface shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]"
            initial={{ opacity: 0, scale: 0.98, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
          >
            <div className="flex flex-col gap-8 p-8">
              <div className="flex flex-col gap-3">
                <h2
                  id="logout-modal-title"
                  className="text-lg font-semibold leading-none tracking-tight text-foreground"
                >
                  Leaving already?
                </h2>
                <p className="text-sm text-muted-foreground">
                  You can go back in anytime to continue your meetings with Hintro.
                </p>
              </div>

              <div className="flex gap-3 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 sm:flex-none sm:w-[110px]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 sm:flex-none sm:w-[110px] bg-foreground text-surface hover:bg-foreground/90"
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
