import { Menu } from 'lucide-react'

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
  return (
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
      <span
        className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-muted text-[10px] font-medium text-foreground"
        aria-hidden
      >
        {initials?.slice(0, 1).toUpperCase() ?? '—'}
      </span>
    </header>
  )
}
