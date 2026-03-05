import Animated, {
  interpolate,
} from 'react-native-reanimated';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import {
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  useRouter,
} from 'expo-router';

import {
  getTransactionsDataByMonth,
} from '@/dataRepositories/transactions/index';
import {
  useTransactionStore,
} from '@/states/transactions.state';
import {
  formatPeriodData,
} from '@/helpers/transactions/history/formatPeriodData';

import {
  TransactionCard,
} from '@/components/card/transactionCard/index';
import {
  CardGroup,
} from '@/components/card/cardsGroup';
import { Feather } from '@expo/vector-icons';

function LastTransactionsWidget() {
  const period = useMemo(() => {
    return new Date()
  }, []);
  const router = useRouter();
  const {
    lastActionTimestamp,
  } = useTransactionStore();
  const [
    transactionData,
    setTransactionData,
  ] = useState({});

  useEffect(() => {
    getTransactionsDataByMonth(
      period,
      5,
    ).then((data) => {
      setTransactionData({
        data: formatPeriodData(data.transactions, period),
        income: data.income,
        expences: data.expences,
        total: data.total,
        count: data.transactions.length,
      });
    })
  }, [lastActionTimestamp]);

  const isEpmty = useMemo(() => {
    return !Boolean(transactionData.data && transactionData.data.length)
  }, [transactionData]);

  return (
    <View style={LastTransactionsWidgetStyles.container}>
      <View style={LastTransactionsWidgetStyles.titleContainer}>
        <Text style={LastTransactionsWidgetStyles.title}>Недавние транзации</Text>
      </View>
      {
        !isEpmty && (
          <View style={LastTransactionsWidgetStyles.transactionsContainer}>
            {transactionData.data.map((item, ind) => {
              return (
                <CardGroup title={item.header} key={item.header}>
                  {(item.data ?? []).sort((f, s) => {
                    try {
                      return new Date(s.transactionDate) - new Date(f.transactionDate);
                    } catch (e) {
                      return 0;
                    }
                  }).map((record) => (
                    <TransactionCard data={record} key={record.transactionDate} />
                  ))}
                </CardGroup>
              )
            })}
          </View>
        )
      }
      {
        !isEpmty && (
          <Pressable
            onPress={() => {
              router.push('/transactions');
            }}
          >
            <View style={LastTransactionsWidgetStyles.viewAll}>
              <Feather name='arrow-right-circle' size={16} color='white' />
              <View style={LastTransactionsWidgetStyles.viewAllSeparator} />
              <Text style={LastTransactionsWidgetStyles.viewAllLabel} >Все транзакции</Text>
            </View>
          </Pressable>
        )
      }
    </View>
  )
}

const LastTransactionsWidgetStyles = StyleSheet.create({
  container: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
  },
  transactionsContainer: {
    width: '96%',
  },
  viewAll: {
    marginTop: 25,
    backgroundColor: '#252525',
    paddingLeft: 15,
    paddingRight: 25,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },
  viewAllSeparator: {
    height: '100%',
    width: 2,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  viewAllLabel: {
    paddingVertical: 6,
    marginLeft: 5,
    color: 'white',
  }
})

export { LastTransactionsWidget };
