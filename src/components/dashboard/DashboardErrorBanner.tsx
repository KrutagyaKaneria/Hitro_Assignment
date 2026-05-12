import { Button } from '@/components/ui/Button'

type Props = {
  message: string
  onRetry: () => void
}

export function DashboardErrorBanner({ message, onRetry }: Props) {
  return (
    <div
      className="mb-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 sm:flex-row sm:items-center sm:justify-between"
      role="alert"
      aria-live="assertive"
    >
      <p className="font-medium">{message}</p>
      <Button
        type="button"
        variant="secondary"
        className="shrink-0 border-red-200 bg-white text-red-900 hover:bg-red-100"
        onClick={onRetry}
      >
        Retry
      </Button>
    </div>
  )
}
