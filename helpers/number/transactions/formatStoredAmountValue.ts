export function formatStoredAmountValue(amount: number) : number {
  return Number.parseFloat(amount.toString().replace(',', '.'));
}