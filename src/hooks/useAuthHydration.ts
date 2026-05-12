import { useEffect, useState } from 'react'

import { useAuthStore } from '@/store/useAuthStore'

export function useAuthHydration(): boolean {
  const [hydrated, setHydrated] = useState(() =>
    useAuthStore.persist.hasHydrated(),
  )

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      // debug: track hydration callbacks that may trigger re-renders
      // eslint-disable-next-line no-console
      console.trace('useAuthHydration: onFinishHydration')
      setHydrated(true)
    })
    return unsub
  }, [])

  return hydrated
}
