import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

import { ActionButton } from '@/components/buttons/actionButton';
import { TransactionsView } from '@/components/views/transaction';
import { useTransactionStore } from '@/states/transactions.state';
import { getTransactionsDataByMonth } from '@/dataRepositories/transactions';

export function formatDateHeader(dateString: string): string {
  const today = new Date();
  const target = new Date(dateString);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  if (isSameDay(target, today)) return 'Сегодня';

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (isSameDay(target, yesterday)) return 'Вчера';

  return target.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}


export function groupTransactionsByDate(transactions: any[]) {
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

export const getData = (transactions) => {
  const groups = groupTransactionsByDate(transactions);
  const sortedKeys = Object.keys(groups).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );
  return sortedKeys.map(key => ({
    dateKey: key,
    header: formatDateHeader(key),
    data: groups[key],
  }));
}

export default function ExpencesPage() {
  const [data, setData] = useState<Array<any>>([]);
  const {
    date: transactionsPeriod,
    lastActionTimestamp,
  } = useTransactionStore();
  const updateTransacionsPeriodData = useTransactionStore(
    (state) => state.setData,
  );

  const loadData = useCallback(() => {
    const getTransactionsDate = async () => {
      const transactionsData = await getTransactionsDataByMonth(
        transactionsPeriod,
      );
      updateTransacionsPeriodData(transactionsData);
      setData(getData(transactionsData.transactions ?? []));
    }
    getTransactionsDate();
  }, [transactionsPeriod, lastActionTimestamp])

  useFocusEffect(loadData);

  return (
    <SafeAreaProvider>
      <TransactionsView data={data} />
      {/* <ActionButton /> */}
    </SafeAreaProvider>
  );
}
