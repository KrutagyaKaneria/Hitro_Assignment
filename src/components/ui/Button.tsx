import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 active:bg-primary/95 disabled:opacity-50',
  secondary:
    'border border-border bg-surface text-foreground shadow-sm transition-colors duration-200 hover:bg-muted active:bg-muted/80 disabled:opacity-50',
  ghost:
    'text-foreground transition-colors duration-200 hover:bg-muted active:bg-muted/80 disabled:opacity-50',
}

export function Button({
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[transform,colors] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-[0.99] disabled:pointer-events-none disabled:active:scale-100',
        variantClass[variant],
        className,
      )}
      {...props}
    />
  )
}
