import { Info } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { cn } from '@/utils/cn'

import type { LucideIcon } from 'lucide-react'

const baseRow =
  'flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left leading-[17px] text-foreground transition-colors lg:px-2.5 lg:py-2.5'

const textSize = (compact?: boolean) =>
  compact ? 'text-sm leading-[14px]' : 'text-[17px]'

const inactiveRow = 'text-foreground hover:bg-muted/60'

const activeRow = 'bg-sidebar-active font-medium text-sidebar-active-fg'

export type SidebarItemProps = {
  to?: string
  end?: boolean
  icon: LucideIcon
  label: string
  info?: boolean
  /** Non-navigation row (muted). */
  muted?: boolean
  onNavigate?: () => void
  compact?: boolean
}

export function SidebarItem({
  to,
  end,
  icon: Icon,
  label,
  info,
  muted,
  onNavigate,
  compact,
}: SidebarItemProps) {
  const iconClass = cn('shrink-0', compact ? 'size-[13px]' : 'size-4')
  const infoBtn = info ? (
    <span
      className="ml-auto inline-flex size-5 items-center justify-center text-muted-foreground"
      aria-hidden
    >
      <Info className="size-4" strokeWidth={2} />
    </span>
  ) : null

  if (muted) {
    return (
      <div
        className={cn(baseRow, textSize(compact), 'cursor-not-allowed opacity-80')}
        aria-disabled="true"
      >
        <Icon className={iconClass} aria-hidden />
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {infoBtn}
      </div>
    )
  }

  if (to) {
    return (
      <NavLink
        to={to}
        end={end}
        onClick={() => onNavigate?.()}
        className={({ isActive }) =>
          cn(baseRow, textSize(compact), isActive ? activeRow : inactiveRow)
        }
      >
        <Icon className={iconClass} aria-hidden />
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {infoBtn}
      </NavLink>
    )
  }

  return (
    <button
      type="button"
      className={cn(baseRow, textSize(compact), inactiveRow)}
      onClick={() => onNavigate?.()}
    >
      <Icon className={iconClass} aria-hidden />
      <span className="min-w-0 flex-1 truncate text-left">{label}</span>
      {infoBtn}
    </button>
  )
}
