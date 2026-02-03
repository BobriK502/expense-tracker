import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  getMonthExpencesByCategories,
  getMonthIncomeByCategories,
} from '@/dataRepositories/transactions'
import {
  TransactionIcon
} from '@/components/ui/transactionIcon/transactionIcon';
import {
  formatAmountStr,
} from '@/helpers/transactions/amountFormatter';
import {
  CategoryChart,
} from '@/components/chart/categoryChart/categoryChart';
import {
  TRANSACTION_TYPE_IDS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/constants/config.entities';

import {
  TransactionSwitch,
} from '@/components/buttons/switches/transactionSwitch/transactionSwitch';

import {
  type TransactionId,
} from '@/types/ui/transaction/transactionType';
import { useTransactionStore } from '@/states/transactions.state';

function TransactionChart(): React.JSX.Element {
  const period = useMemo(() => {
    return new Date();
  }, []);

  const [income, setIncome] = useState([]);
  const [expences, setExpences] = useState([]);
  const [selectedInd, setSelectedInd] = useState<number | null>(null);
  const [
    selectedTransactionType,
    setSelectedTransactionType,
  ] = useState<TransactionId>(TRANSACTION_TYPE_IDS.EXPENCE);
  const {
    lastActionTimestamp,
  } = useTransactionStore();

  useEffect(() => {
    const loadData = async () => {
      const expences = await getMonthExpencesByCategories(period);
      const income = await getMonthIncomeByCategories(period);

      return [expences, income];
    }

    loadData().then(([expences, income]) => {
      setExpences(expences);
      setIncome(income);
    })
  }, [lastActionTimestamp]);

  const totalExpences = expences.reduce((acc, e) => (acc + e.total), 0)
  const totalIncome = income.reduce((acc, i) => (acc + i.total), 0)

  const onSelect = useCallback((ind) => {
    setSelectedInd(ind);
  }, []);

  const data = useMemo(() => {
    if (selectedTransactionType === TRANSACTION_TYPE_IDS.EXPENCE) {
      return expences;
    }

    return income;
  }, [expences, income, selectedTransactionType]);

  const selectedItem = selectedInd !== null ? data[selectedInd] : null;

  const setTransactionType = useCallback((id: TransactionId) => {
    setSelectedInd(null);
    setSelectedTransactionType(id);
  }, []);


  return (
    <View style={TransactionChartStyles.chartContainer}>
      <View style={TransactionChartStyles.chartSummaryContainer}>
        <View style={TransactionChartStyles.chartSummaryInfo}>
          {/* <Text>dsfdfds</Text> */}
        </View>
        <View style={TransactionChartStyles.chartTransactionChangeButtonContainer}>
          <TransactionSwitch
            values={TRANSACTION_TYPE_OPTIONS}
            selectedValue={selectedTransactionType}
            onChange={setTransactionType}
          />
        </View>
      </View>
      <CategoryChart data={data} onSelect={onSelect} />
      <View style={TransactionChartStyles.selectedItemContainer}>
        {selectedItem !== null && (<View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }} key={selectedItem.id}>
          <View style={{ height: 50, width: 50, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 50, width: 50, backgroundColor: selectedItem.color, borderRadius: '50%', elevation: 1, opacity: 0.6, position: 'absolute' }} />
            <TransactionIcon iconId={selectedItem.iconId} color={selectedItem.color} size='small' />
          </View>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={{ paddingBottom: 5, marginLeft: 10, fontSize: 14, fontWeight: 400 }}>{selectedItem.title}</Text>
                <Text style={{ marginLeft: 10, fontSize: 11, fontWeight: 300, color: 'gray ' }}>{selectedItem.transactionCount} транзакций</Text>
              </View>
              <View style={{ justifyContent: 'flex-end', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>{formatAmountStr(selectedItem.total)}</Text>
              </View>
            </View>
          </View>
        </View>)}
      </View>
    </View>
  );
}

const TransactionChartStyles = StyleSheet.create({
  chartContainer: {
    backgroundColor: 'white',
  },
  chartSummaryContainer: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartSummaryInfo: {
    flex: 1,
  },
  chartTransactionChangeButtonContainer: {
    width: 40,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectedItemContainer: {
    width: '100%',
    paddingHorizontal: 15,
  }
})

export { TransactionChart };