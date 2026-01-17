import React from 'react'
import {
  View,
  Text,
} from 'react-native';

interface PeriodFooterProps {
  count: number;
  total: number;
}

const PeriodFooter = React.memo<PeriodFooterProps>(
  function ({
    count,
    total,
  }) {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: 15 }}>
        <Text style={{ fontSize: 11, fontWeight: 300, marginBottom: 8, color: 'gray', textShadowColor: '#EEF6FF', textShadowRadius: 1 }}>Общий денежный оборот: {total.toString()} руб.</Text>
        <Text style={{ fontSize: 11, fontWeight: 300, marginBottom: 8, color: 'gray', textShadowColor: '#EEF6FF', textShadowRadius: 1 }}>{count} транзакции</Text>
      </View>
    )
  }
);

export {
  PeriodFooter,
};
