import type { LabelHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-xs font-medium leading-none text-foreground sm:text-base',
        className,
      )}
      {...props}
    />
  )
}
