import { SIDEBAR_PRIMARY, SIDEBAR_SECONDARY } from '@/constants/nav'
import type { DashboardResponse } from '@/types/api'
import { cn } from '@/utils/cn'

import { Button } from '@/components/ui/Button'

import { SidebarItem } from './SidebarItem'

type Props = {
  usage?: DashboardResponse['usage']
  onNavigate?: () => void
  onOpenFeedback?: () => void
  /** Smaller typography for the mobile drawer. */
  compact?: boolean
  className?: string
}

export function Sidebar({
  usage,
  onNavigate,
  onOpenFeedback,
  compact,
  className,
}: Props) {
  const used = usage?.kb_files.used ?? 0
  const limit = usage?.kb_files.limit ?? 0

  return (
    <aside
      className={cn(
        'flex h-full w-full max-w-[262px] flex-col border-r border-border bg-surface',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-[65px] shrink-0 items-end border-b border-border/60 pb-4',
          compact ? 'px-4' : 'pl-[59px] pr-4',
        )}
      >
        <span
          className={cn(
            'font-semibold tracking-tight text-foreground',
            compact ? 'text-lg' : 'text-[29px] leading-none',
          )}
        >
          Hintro
        </span>
      </div>

      <nav
        className={cn(
          'flex flex-1 flex-col overflow-y-auto px-4 pt-6 lg:px-[30px] lg:pt-[26px]',
          compact && 'px-3 pt-5',
        )}
        aria-label="Main navigation"
      >
        <div className="flex flex-col gap-1">
          {SIDEBAR_PRIMARY.map((entry, i) =>
            entry.type === 'link' ? (
              <SidebarItem
                key={`${entry.to}-${i}`}
                to={entry.to}
                end={entry.end}
                icon={entry.icon}
                label={entry.label}
                info={entry.info}
                compact={compact}
                onNavigate={onNavigate}
              />
            ) : (
              <SidebarItem
                key={entry.label}
                icon={entry.icon}
                label={entry.label}
                info={entry.info}
                compact={compact}
                muted
              />
            ),
          )}
        </div>

        <div
          className={cn('my-6 h-px w-full bg-border', compact && 'my-5')}
          role="separator"
        />

        <div className="flex flex-col gap-1">
          {SIDEBAR_SECONDARY.map((entry) =>
            entry.type === 'link' ? (
              <SidebarItem
                key={entry.to}
                to={entry.to}
                icon={entry.icon}
                label={entry.label}
                compact={compact}
                onNavigate={onNavigate}
              />
            ) : entry.type === 'feedback' ? (
              <SidebarItem
                key={entry.label}
                icon={entry.icon}
                label={entry.label}
                compact={compact}
                onNavigate={() => {
                  onOpenFeedback?.()
                  onNavigate?.()
                }}
              />
            ) : entry.type === 'item' ? (
              <SidebarItem
                key={entry.label}
                icon={entry.icon}
                label={entry.label}
                compact={compact}
                muted
              />
            ) : null,
          )}
        </div>

        <div className="mt-auto flex flex-col gap-4 pb-6 pt-10">
          <div
            className={cn(
              'rounded-lg border border-border bg-muted/40 px-4 py-4',
              compact && 'px-3 py-3',
            )}
          >
            <p className="text-center text-[17px] font-normal leading-tight text-foreground">
              {used} of {limit} files used
            </p>
            <div className="mt-3 h-px w-full bg-border" />
          </div>

          <Button
            type="button"
            variant="primary"
            className="h-[33px] w-[180px] self-center rounded-md bg-neutral-800 text-[17px] font-normal text-white hover:bg-neutral-800/90"
          >
            Upgrade
          </Button>

          <p className="px-1 text-center text-xs leading-relaxed text-muted-foreground">
            © 2025 Hintro. Made in India 🇮🇳
          </p>
        </div>
      </nav>
    </aside>
  )
}
