import {
  formatDateHeader,
} from '@/helpers/date/transactions/formatHeader';
import {
  groupByDate,
} from '@/helpers/transactions/history/groupByDate';

export function formatPeriodData(transactions: any, period: any) {
  if (transactions.length === 0) {
    return [
      {
        isEmpty: true,
        label: `no data for ${period.toLocaleDateString('ru-RU')}`
      }
    ]
  }

  const { groups, groupsSummaryInfo } = groupByDate(transactions);
  const sortedKeys = Object.keys(groups).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );
  return sortedKeys.map(key => ({
    dateKey: key,
    header: formatDateHeader(key),
    data: groups[key],
    groupsSummaryInfo: groupsSummaryInfo[key]
  }));
}