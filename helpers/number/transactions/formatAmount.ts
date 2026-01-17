export function formatAmount(amount: any): number {
  const numberAmount = Number(amount);

  if (Number.isNaN(numberAmount)) return 0;

  return Math.round(numberAmount) / 100;
}