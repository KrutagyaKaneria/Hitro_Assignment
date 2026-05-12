import { Button } from '@/components/ui/Button'

type Props = {
  firstName: string
}

export function GreetingBanner({ firstName }: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 space-y-2 lg:space-y-2">
        <p className="text-[19px] font-normal leading-tight text-foreground lg:text-2xl lg:leading-none">
          Hi, {firstName} 👋 Welcome to Hintro
        </p>
        <p className="text-[10px] font-normal leading-tight text-muted-foreground lg:text-sm">
          Ready to make your next call smarter ?
        </p>
      </div>
      <Button
        type="button"
        variant="primary"
        className="h-[26px] w-[58px] shrink-0 self-start rounded-md px-0 text-[10px] font-medium leading-none lg:h-[38px] lg:w-[137px] lg:self-auto lg:text-base lg:font-normal"
      >
        <span className="lg:hidden">Start Call</span>
        <span className="hidden lg:inline">Start New Call</span>
      </Button>
    </div>
  )
}
