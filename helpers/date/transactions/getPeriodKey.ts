export function getPeriodKey(period: Date): string {
  return `${period.getMonth() + 1}-${period.getFullYear()}`
}