import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <main className="flex flex-1 flex-col items-center px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        {children}
      </main>
    </div>
  )
}
