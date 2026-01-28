import {
  View,
  Text,
} from 'react-native';
import { JSX } from 'react';
import {
  Feather,
} from '@expo/vector-icons';

import {
  EmptyPeriodStyles,
} from '@/components/views/transaction/periodView/emptyPeriod/style';

type EmptyPeriodProps = {
  label: string;
}

function EmptyPeriod({
  label,
}: EmptyPeriodProps): JSX.Element {
  return (
    <View key={label} style={EmptyPeriodStyles.container}>
      <View style={EmptyPeriodStyles.inner}>
        <Feather name={"info"} size={20} color="black" />
        <Text style={EmptyPeriodStyles.label}>{label}</Text>
      </View>
    </View>
  );
}

export { EmptyPeriod };
