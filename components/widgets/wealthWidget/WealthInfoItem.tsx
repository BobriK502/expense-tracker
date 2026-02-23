import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  formatAmountStr,
} from '@/helpers/transactions/amountFormatter';

type WealthInfoItemProps = {
  item: {
    name: string;
    value: string;
  };
}

function WealthInfoItem({
  item,
}: WealthInfoItemProps) {
  return (
    <View style={WealthInfoItemStyles.container}>
      <View style={WealthInfoItemStyles.labelContainer}>
        <Text style={WealthInfoItemStyles.label}>{item.name}</Text>
      </View>
      <View style={WealthInfoItemStyles.amountValueContainer}>
        <Text style={WealthInfoItemStyles.amountValue}>{formatAmountStr(item.value)}</Text>
      </View>
    </View>
  )
}

const WealthInfoItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingLeft: 10,
  },
  labelContainer: {
    width: '60%',
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
  },
  amountValueContainer: {
    width: '40%',
    alignItems: 'flex-end'
  },
  amountValue: {
    fontSize: 16,
  }
});

export { WealthInfoItem };
