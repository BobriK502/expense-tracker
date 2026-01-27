import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  TransactionForm,
} from '@/components/form/entities/transaction';
import {
  createTransaction,
} from '@/dataRepositories/transactions';

function TransactionAdd({}): React.JSX.Element {
  const handleSubmit = (data) => {
    createTransaction({
      transactionTypeId: data.transactionTypeId,
      title: data.title,
      amount: data.amount,
      notice: '',
      date: data.date,
      categoryId: data.categoryId,
    });
  }

  return (
    <View style={TransactionAddStyles.container}>
      <TransactionForm
        onSubmit={handleSubmit}
        defaultValues={{
          amount: '',
          date: new Date(),
          categoryId: null,
          title: '',
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

export { TransactionAdd };
