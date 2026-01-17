export function formatTransactionTime(transactionDate: string) {
  const date = new Date(transactionDate);

  return date.toLocaleTimeString(
    "ru-RU",
    {
      timeStyle: 'short',
    }
  )
}