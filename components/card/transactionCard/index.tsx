import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import { useBottomSheet } from '@/states/bottomSheet.state';
import { GenericCard } from '@/components/card/generic/index';

import { useTransactionStore } from '@/states/transactions.state';
import {
  TransactionAmount,
} from '@/components/ui/transactionAmount';
import {
  TransactionIcon
} from '@/components/ui/transactionIcon/transactionIcon';
import {
  formatAmountStr,
} from '@/helpers/transactions/amountFormatter';
import {
  formatTransactionTime,
} from '@/helpers/transactions/formatTransactionTime';

function TransactionCard({
  data,
}) {
  const setIsOpen = useBottomSheet((state) => state.setIsOpen);
  const setActiveBshView = useBottomSheet((state) => state.setActiveView);
  const setActiveTransaction = useTransactionStore(
    (state) => state.setSelectedTransaction,
  );

  const handlePress = () => {
    setActiveBshView('transaction');
    setIsOpen(true);
    setActiveTransaction(data);
  }

  return (
    <GenericCard
      onPress={handlePress}
      style={styles.card}
      underlayColor="#F4F4F5"
      backgroundColor="#ffff"
    >
      <View style={styles.inner}>
        <TransactionIcon iconId={data.iconId} color={data.color} />
        <View style={styles.desctiptionContainer}>
          <Text style={styles.desctiptionTitle}>{data.title}</Text>
          <Text style={[styles.categoryTitle]}>{data.categoryTitle}</Text>
        </View>
        <View
          style={styles.amountContainer}
        >
          <TransactionAmount
            transactionTypeId={data.transactionTypeId}
            amountStr={formatAmountStr(data.amount)}
            size='default'
          />
          <Text style={styles.descriptionDate}>{formatTransactionTime(data.transactionDate)}</Text>
        </View>

      </View>
    </GenericCard >
  )
}

const styles = StyleSheet.create({
  inner: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  categoryTitle: {
    color: 'gray',
    fontSize: 11,
    fontWeight: 500,
  },
  desctiptionContainer: {
    paddingLeft: 14,
    height: 50,
    justifyContent: 'center',
  },
  desctiptionTitle: {
    fontSize: 15,
    color: '#262626',
    paddingBottom: 3,
  },
  descriptionDate: {
    fontSize: 12,
    fontWeight: 400,
    paddingRight: 5,
    color: 'gray'
  },
  amountContainer: {
    position: 'absolute',
    top: 0,
    right: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    height: 60,
    marginTop: 5,
    marginRight: 3,
    marginLeft: 3,
    paddingHorizontal: 5,
  }
});

export { TransactionCard };
