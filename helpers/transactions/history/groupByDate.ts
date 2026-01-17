import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';

export function groupByDate(transactions: any[]) {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.transactionDate);

    const dateKey = date.toISOString().split('T')[0];

    if (!acc.groups[dateKey]) {
      acc.groups[dateKey] = [];
    }

    if (!acc.groupsSummaryInfo[dateKey]) {
      acc.groupsSummaryInfo[dateKey] = 0;
    }

    const multiplier = transaction.transactionTypeId === TRANSACTION_TYPE_IDS.EXPENCE
      ? -1
      : 1;

    acc.groupsSummaryInfo[dateKey] += (transaction.amount * multiplier);
    acc.groups[dateKey].push(transaction);
    return acc;
  }, { groups: {}, groupsSummaryInfo: {} },);
}