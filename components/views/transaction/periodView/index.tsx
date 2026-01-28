import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {
  getTransactionsDataByMonth,
} from '@/dataRepositories/transactions';
import {
  TransactionCard,
} from '@/components/card/transactionCard/index';
import {
  CardGroup,
} from '@/components/card/cardsGroup';
import {
  formatPeriodData,
} from '@/helpers/transactions/history/formatPeriodData';
import {
  useTransactionStore,
} from '@/states/transactions.state';
import {
  PeriodHeader,
} from '@/components/views/transaction/periodView/header';
import {
  PeriodFooter,
} from '@/components/views/transaction/periodView/footer';
import {
  EmptyPeriod,
} from '@/components/views/transaction/periodView/emptyPeriod/emptyPreoid';
import { HEADER_MAX_HEIGHT } from '../config.ui';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


interface TransactionPeriodProps {
  isActive: boolean;
  period: Date;
  preloadData: boolean;
}

const TransactionsPeriodView = React.memo<TransactionPeriodProps>(
  ({
    period,
    isActive,
    preloadData,
  }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const flatListRef = useRef<Animated.ScrollView>(null);
    const {
      getPeriodData,
      addPeriodData,
      lastActionTimestamp,
      removePeriodData,
    } = useTransactionStore();

    const {
      data,
      income,
      expences,
      total,
      count,
    } = useMemo(() => {
      if (isLoading) return {
        data: [],
        income: 0,
        expences: 0,
        total: 0,
        count: 0,
      };

      const periodData = getPeriodData(period)

      return {
        data: formatPeriodData(periodData.transactions, period),
        income: periodData.income,
        expences: periodData.expences,
        total: periodData.total,
        count: periodData.transactions.length,
      };
    }, [isLoading])

    const isStatisticInfoVisible = useMemo(() => {
      return !isLoading && count > 0;
    }, [count, isLoading])

    useEffect(() => {
      if (!preloadData) return;

      const getDataTransactions = async () => {
        const transactionsData = await getTransactionsDataByMonth(period);
        addPeriodData(transactionsData);
        setIsLoading(false);
      }

      setIsLoading(true);
      getDataTransactions();
    }, [lastActionTimestamp, preloadData]);

    useEffect(() => {
      return () => {
        removePeriodData(period);
      }
    }, []);

    useEffect(() => {
      if (flatListRef.current && !isActive) {
        flatListRef.current.scrollTo({
          y: 0,
          animated: false,
        });
      }
    }, [isActive]);

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          ref={flatListRef}
          scrollEventThrottle={1}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {(isStatisticInfoVisible) && (
            <PeriodHeader
              income={income}
              total={total}
              expences={expences}
            />
          )}
          {data.map((item) => {
            if (item.isEmpty) {
              return (
                <EmptyPeriod label={item.label} />
              )
            }

            return (
              <CardGroup title={item.header} key={item.header} summary={item.groupsSummaryInfo}>
                {item.data.sort((f, s) => {
                  try {
                    return new Date(s.transactionDate) - new Date(f.transactionDate);
                  } catch (e) {
                    return 0;
                  }
                }).map((record) => (
                  <TransactionCard data={record} key={record.transactionDate} />
                ))}
              </CardGroup>
            );
          })}
          {(isStatisticInfoVisible) && (
            <PeriodFooter
              count={count}
              total={total}
            />
          )}
        </Animated.ScrollView>
      </View>
    );
  });


const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },
  content: {
    paddingHorizontal: 5,
    paddingBottom: 32,
    minHeight: SCREEN_HEIGHT - 50 - HEADER_MAX_HEIGHT,
  },
});

export { TransactionsPeriodView };
