import React, { useEffect, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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


export default function DashboardView(): React.JSX.Element {
  const period = useMemo(() => {
    return new Date();
  }, [])
  const [income, setIncome] = useState([]);
  const [expences, setExpences] = useState([]);
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
  }, []);

  const totalExpences = expences.reduce((acc, e) => (acc + e.total), 0)
  const totalIncome = income.reduce((acc, i) => (acc + i.total), 0)

  return (
    <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
      <View style={{ width: '100%', paddingHorizontal: 20, paddingBottom: 20, height: 200, justifyContent:'flex-end'}}>
        <Text style={{ fontSize: 22, fontWeight: 400 }}>
          Главная
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10, margin: 10, backgroundColor: 'white', borderRadius: 10, elevation: 2 } }>
        <View style={{ padding: 5, marginBottom: 2, marginTop: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: 500, marginBottom: 3 }}>
            Категории
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 300,}}>
            {period.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric'})}
          </Text>
        </View>
        {
          expences.map((expence) => {
            const percent = Math.round((expence.total / totalExpences) * 10000) /100;
            const width = Math.round(percent);
            const progressLeft = 100 - width;

            return (
              <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }} key={expence.id}>
                <View style={{ height: 50, width: 50, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ height: 50, width: 50, backgroundColor: expence.color, borderRadius: '50%', elevation: 1, opacity: 0.7, position: 'absolute' }} />
                  <TransactionIcon iconId={expence.iconId} color={expence.color} size='small' />
                </View>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <View style={{ flexDirection: 'row'}}>
                    <View style={{ flexDirection: 'column', flex: 1}}>
                      <Text style={{ paddingBottom: 5, marginLeft: 10, fontSize: 14, fontWeight: 400 }}>{expence.title}</Text>
                      <Text style={{ marginLeft: 10, fontSize: 11, fontWeight: 300, color: 'gray ' }}>{percent}% суммы транзакций</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end'}}>
                      <Text>{formatAmountStr(expence.total)}</Text>
                    </View>
                  </View>
                  <View style={{ paddingLeft: 8, marginTop: 10, flexDirection: 'row', gap: 3 }}>
                    <View style={{ width: `${width}%`, height: 6, backgroundColor: expence.color, borderRadius: 5, opacity: 0.8, elevation: 0.5 }} />
                    <View style={{ width: `${progressLeft}%`, height: 6, backgroundColor: '#F5F5F5', borderRadius: 5, justifyContent: 'center', elevation: 0.5 }} />
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>

      <View style={{ paddingHorizontal: 10, margin: 10, borderRadius: 10, backgroundColor: 'white', elevation: 2 }}>
        <View style={{ padding: 5, marginBottom: 2, marginTop: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: 500, marginBottom: 3 }}>
            Категории
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 300, }}>
            {period.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
          </Text>
        </View>
        {
          income.map((income) => {
            const percent = Math.round((income.total / totalIncome) * 10000) / 100;
            const width = Math.round(percent);
            const progressLeft = 100 - width;
            return (
              <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }} key={income.id}>
                <View style={{ height: 50, width: 50, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ height: 50, width: 50, backgroundColor: income.color, borderRadius: '50%', elevation: 1, opacity: 0.6, position: 'absolute' }} />
                  <TransactionIcon iconId={income.iconId} color={income.color} size='small' />
                </View>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                      <Text style={{ paddingBottom: 5, marginLeft: 10, fontSize: 14, fontWeight: 400 }}>{income.title}</Text>
                      <Text style={{ marginLeft: 10, fontSize: 11, fontWeight: 300, color: 'gray ' }}>{percent}% суммы транзакций</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                      <Text style={{ fontSize: 14 }}>{formatAmountStr(income.total)}</Text>
                    </View>
                  </View>
                  <View style={{ paddingLeft: 8, marginTop: 10 }}>
                    <View style={{ width: `${width}%`, height: 6, backgroundColor: income.color, borderRadius: 5, opacity: 0.8, elevation: 0.5 }} />
                    <View style={{ width: `${progressLeft}%`, height: 6, backgroundColor: '#F5F5F5', borderRadius: 5, justifyContent: 'center' }} />
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  );
}