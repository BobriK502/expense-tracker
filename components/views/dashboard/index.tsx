import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  TransactionChart,
} from '@/components/chart/transactionChart/transactionChart';
import {
  LastTransactionsWidget,
} from '@/components/widgets/lastTransactionsWidget/lastTransactionsWidget';
import {
  BalanceWidget,
} from '@/components/widgets/BalanceWidget/BalanceWidget';

export default function DashboardView(): React.JSX.Element {
  return (
    <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
      <View style={{ width: '100%', paddingHorizontal: 20, paddingBottom: 20, height: 200, justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 22, fontWeight: 400 }}>
          Главная
        </Text>
      </View>
      <BalanceWidget />
      <TransactionChart />
      <LastTransactionsWidget />
    </View>
  );
}

const DashboardViewStyles = StyleSheet.create({
  chartSummaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartSummaryInfo: {
    flex: 1,
  },
  chartTransactionChangeButtonContainer: {
    width: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})