/** Formats seconds like Figma: `14m 22sec`, `0` when empty. */
export function formatDurationSeconds(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return '0'
  }
  const s = Math.floor(totalSeconds)
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}sec`
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}sec`
  }
  return `${seconds}sec`
}
