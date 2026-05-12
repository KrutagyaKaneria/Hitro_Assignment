import { Button } from '@/components/ui/Button'

type Props = {
  firstName: string
}

export function GreetingBanner({ firstName }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-2 lg:space-y-1.5">
        <p className="text-base font-normal leading-tight text-foreground lg:text-2xl lg:leading-tight">
          Hi, {firstName} Welcome to Hintro
        </p>
        <p className="text-xs font-normal leading-tight text-muted-foreground lg:text-sm">
          Ready to make your next call smarter ?
        </p>
      </div>
      <Button
        type="button"
        variant="primary"
        className="h-9 w-full shrink-0 rounded-md px-4 text-sm font-semibold leading-none lg:h-10 lg:w-auto lg:px-5 lg:text-base lg:font-normal"
      >
        Start New Call
      </Button>
    </div>
  )
}
