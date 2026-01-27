import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  TransactionForm,
} from '@/components/form/entities/transaction';
import {
  updateTransaction,
} from '@/dataRepositories/transactions';
import {
  useTransactionStore,
} from '@/states/transactions.state';

function TransactionEdit({ }): React.JSX.Element | null {
  const {
    selectedTransaction,
  } = useTransactionStore();

  const handleSubmit = (data) => {
    updateTransaction({
      id: selectedTransaction!.id,
      transactionTypeId: data.transactionTypeId,
      title: data.title,
      amount: data.amount * 100,
      notice: '',
      transactionDate: data.date instanceof Date ? data.date.toISOString() : data.date,
      categoryId: data.categoryId,
    });
  }

  if (!selectedTransaction) return null;

  return (
    <View style={TransactionAddStyles.container}>
      <TransactionForm
        onSubmit={handleSubmit}
        defaultValues={{
          amount: selectedTransaction.amount.toString(),
          date: new Date(selectedTransaction.transactionDate),
          categoryId: selectedTransaction.categoryId,
          title: selectedTransaction.title,
          transactionTypeId: selectedTransaction.transactionTypeId,
        }}
      />
    </View>
  );
}

const TransactionAddStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});

export { TransactionEdit };
