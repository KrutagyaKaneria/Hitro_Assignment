export type UserId = 'u1' | 'u2'

export function isUserId(value: string): value is UserId {
  return value === 'u1' || value === 'u2'
}
