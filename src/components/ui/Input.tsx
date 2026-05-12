import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/utils/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  leftAdornment?: ReactNode
  rightAdornment?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, leftAdornment, rightAdornment, id, ...props },
  ref,
) {
  return (
    <div className="w-full">
      <div className="relative">
        {leftAdornment ? (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground [&_svg]:size-5">
            {leftAdornment}
          </span>
        ) : null}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-12 w-full rounded-md border border-transparent bg-input px-3 text-sm text-foreground shadow-sm transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-sm',
            leftAdornment && 'pl-11',
            rightAdornment && 'pr-11',
            error && 'ring-2 ring-red-500/30',
            className,
          )}
          {...props}
        />
        {rightAdornment ? (
          <span className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center text-muted-foreground">
            {rightAdornment}
          </span>
        ) : null}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
})
