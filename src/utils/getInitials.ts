export function getInitials(firstName?: string, lastName?: string): string {
  const a = firstName?.trim()?.[0] ?? ''
  const b = lastName?.trim()?.[0] ?? ''
  const s = `${a}${b}`.toUpperCase()
  return s || '?'
}
