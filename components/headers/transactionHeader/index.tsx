import { useTransactionStore } from '@/states/transactions.state';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  View,
  Text,
} from 'react-native';

export interface ITransactionHeaderProps {
  onPrev: () => void;
  onNext: () => void;
  currentPeriod: string;
  currentPeriodData: {
    expencesSum: number;
    incomeSum: number;
  };
}

function TransactionHeader(): React.JSX.Element {
  const setCurrentPeriod = useTransactionStore((state) => state.setDate);
  const currentPeriod = useTransactionStore((state) => state.date);

  const onPrev = () => {
    const newDate = new Date(currentPeriod.toString());
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentPeriod(newDate);
  }

  const onNext = () => {
    const newDate = new Date(currentPeriod.toString());
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentPeriod(newDate);
  }
  
  return (
    <View style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 5, paddingBottom: 5 }}>
        <Pressable onPress={onPrev}>
          <View style={{ marginRight: 30, width: 40, height: 25, alignItems: 'flex-start', justifyContent: 'center' }}>
            <FontAwesome6 name="angle-left" size={18} />
          </View>
        </Pressable>
        <View style={{ width: 150, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{currentPeriod.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric'})}</Text>
        </View>
        <Pressable onPress={onNext}>
          <View style={{ marginLeft: 30, width: 40, height: 25, alignItems: 'flex-end', justifyContent: 'center' }}>
            <FontAwesome6 name="angle-right" size={18} />
          </View>
        </Pressable>
      </View>
      {/* <View>
        <View>
          <Text>expence</Text>
        </View>
        <View>
          <Text>expence</Text>
        </View>
        <View>
          <Text>left</Text>
        </View>
      </View> */}
    </View>
  );
}

export { TransactionHeader };
