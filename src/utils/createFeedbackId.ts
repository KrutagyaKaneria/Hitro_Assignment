export function createFeedbackId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `fb_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}
