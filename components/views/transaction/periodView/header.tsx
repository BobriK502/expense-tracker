import {
  View,
  Text,
} from 'react-native';
import React from 'react';

import {
  TransactionAmount
} from '@/components/ui/transactionAmount';
import {
  formatAmountStr,
} from '@/helpers/transactions/amountFormatter';
import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';

interface PeriodHeaderProps {
  income: number;
  expences: number;
  total: number;
}

const PeriodHeader = React.memo<PeriodHeaderProps>(
  function ({
    income,
    expences,
    total,
  }) {
    return (
      <View style={{ width: '100%', height: 30, backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 15, marginTop: 25, flexDirection: 'row' }}>
        <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
          <TransactionAmount
            transactionTypeId={TRANSACTION_TYPE_IDS.INCOME}
            amountStr={formatAmountStr(income)}
            size='small'
          />
        </View>
        <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
          <TransactionAmount
            transactionTypeId={TRANSACTION_TYPE_IDS.EXPENCE}
            amountStr={formatAmountStr(expences)}
            size='small'
          />
        </View>
        <View style={{ width: '33%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14 }}>= {formatAmountStr(total)}</Text>
        </View>
      </View>
    )
  }
);

export {
  PeriodHeader,
};
