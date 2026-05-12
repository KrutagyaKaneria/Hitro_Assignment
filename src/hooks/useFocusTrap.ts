import { useEffect } from 'react'
import type { RefObject } from 'react'

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || root.contains(el),
  )
}

export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active || !containerRef.current) return
    const root = containerRef.current

    const focusables = getFocusable(root)
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusables.length === 0) return
      const idx = focusables.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey) {
        if (idx <= 0 || idx === -1) {
          e.preventDefault()
          last.focus()
        }
      } else if (idx === focusables.length - 1 || idx === -1) {
        e.preventDefault()
        first.focus()
      }
    }

    root.addEventListener('keydown', onKeyDown)
    return () => root.removeEventListener('keydown', onKeyDown)
  }, [active, containerRef])
}
