export function formatTransactionDate(
  transactionDate: string,
  dateConfig = {
    weekday: "long",
    month: "short",
    day: "numeric",
  }
) {
  const date = new Date(transactionDate);
  const dateString = date.toLocaleDateString(
    "ru-RU",
    dateConfig,
  );
  const timeString = date.toLocaleTimeString(
    "ru-RU",
    {
      timeStyle: 'short',
    }
  )
  return `${dateString} ${timeString}`
}