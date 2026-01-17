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
      <View style={{ width: '100%', height: 30, backgroundColor: '#EEF6FF', borderRadius: 10, elevation: 0.8, marginTop: 8, flexDirection: 'row', opacity: 0.8 }}>
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
