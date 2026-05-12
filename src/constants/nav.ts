import type { LucideIcon } from 'lucide-react'
import {
  Download,
  FileText,
  Gift,
  Inbox,
  LayoutDashboard,
  MessageSquareText,
  Phone,
  SlidersHorizontal,
} from 'lucide-react'

export type SidebarNavEntry =
  | {
      type: 'link'
      to: string
      label: string
      icon: LucideIcon
      end?: boolean
      info?: boolean
    }
  | {
      type: 'item'
      label: string
      icon: LucideIcon
      info?: boolean
    }

export const SIDEBAR_PRIMARY: SidebarNavEntry[] = [
  { type: 'link', to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { type: 'item', label: 'Call Insights', icon: Phone },
  { type: 'item', label: 'Knowledge Base', icon: FileText, info: true },
  { type: 'item', label: 'Prompts', icon: MessageSquareText, info: true },
  { type: 'item', label: 'Boxy Controls', icon: SlidersHorizontal, info: true },
]

export const SIDEBAR_SECONDARY: SidebarNavEntry[] = [
  { type: 'item', label: 'Download Desktop App', icon: Download },
  {
    type: 'link',
    to: '/feedback-history',
    label: 'Feedback History',
    icon: Inbox,
  },
  { type: 'item', label: 'Feedback', icon: Gift },
]
