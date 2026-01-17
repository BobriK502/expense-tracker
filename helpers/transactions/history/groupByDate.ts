export function groupByDate(transactions: any[]) {
  return transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.transactionDate);

    const dateKey = date.toISOString().split('T')[0];

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {});
}