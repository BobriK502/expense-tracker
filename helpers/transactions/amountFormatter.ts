import cc from 'currency-codes';

export const formatAmountStr = (amount: number, currencyCode = 933) => {
  return `${amount.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${cc.number(currencyCode)?.code}`
}