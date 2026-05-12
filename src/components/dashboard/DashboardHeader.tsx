import { Play, ChevronDown, LogOut } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { LogoutModal } from '@/components/dashboard/LogoutModal'
import { cn } from '@/utils/cn'

type Props = {
  title: string
  initials?: string
  className?: string
}

export function DashboardHeader({ title, initials, className }: Props) {
  const [accountOpen, setAccountOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const accountButtonRef = useRef<HTMLButtonElement>(null)

  const handleLogoutClick = () => {
    setAccountOpen(false)
    setLogoutOpen(true)
  }

  return (
    <>
      <header
        className={cn(
          'hidden h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-6 lg:flex lg:pl-12 lg:pr-8',
          className,
        )}
      >
        <h1 className="text-[29px] font-normal leading-none tracking-tight text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-6">
          <Button
            type="button"
            variant="secondary"
            className="h-8 gap-2 rounded-md border border-border bg-surface px-3 text-[15px] font-normal shadow-none"
          >
            <Play className="size-5 fill-foreground text-foreground" aria-hidden />
            Watch Tutorial
          </Button>
          <div className="relative">
            <button
              ref={accountButtonRef}
              type="button"
              className="flex items-center gap-2 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={initials ? `Account menu (${initials})` : 'Account menu'}
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <span className="flex size-[35px] items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-foreground">
                {initials ?? '—'}
              </span>
              <ChevronDown
                className={cn('size-4 text-muted-foreground transition-transform', {
                  'rotate-180': accountOpen,
                })}
                aria-hidden
              />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-surface shadow-lg">
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset rounded-lg"
                >
                  <LogOut className="size-4" aria-hidden />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  )
}
