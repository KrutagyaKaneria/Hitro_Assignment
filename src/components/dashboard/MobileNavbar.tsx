import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

import { LogoutModal } from '@/components/dashboard/LogoutModal'

import { cn } from '@/utils/cn'

type Props = {
  title: string
  initials?: string
  onOpenMenu: () => void
  menuOpen?: boolean
  className?: string
}

export function MobileNavbar({
  title,
  initials,
  onOpenMenu,
  menuOpen = false,
  className,
}: Props) {
  const [accountOpen, setAccountOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleLogoutClick = () => {
    setAccountOpen(false)
    setLogoutOpen(true)
  }

  return (
    <>
      <header
        className={cn(
          'flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-5 lg:hidden',
          className,
        )}
      >
        <button
          type="button"
          onClick={onOpenMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open navigation menu"
        >
          <Menu className="size-[18px]" strokeWidth={2} aria-hidden />
        </button>
        <h1 className="min-w-0 max-w-[55%] truncate text-center text-[19px] font-normal leading-none text-foreground">
          {title}
        </h1>
        <div className="relative">
          <button
            type="button"
            onClick={() => setAccountOpen((v) => !v)}
            aria-label={initials ? `Account menu (${initials})` : 'Account menu'}
            className="flex size-7 items-center justify-center overflow-hidden rounded-full bg-muted text-[10px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {initials?.slice(0, 1).toUpperCase() ?? '—'}
          </button>

          {accountOpen ? (
            <div className="absolute right-0 top-full z-50 mt-2 w-36 rounded-lg border border-border bg-surface shadow-lg">
              <button
                type="button"
                onClick={handleLogoutClick}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <LogOut className="size-4" aria-hidden />
                Log out
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  )
}
