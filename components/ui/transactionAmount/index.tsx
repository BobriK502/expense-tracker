import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';


function glyphByTransactionTypeId(transactionTypeId) {
  return transactionTypeId === TRANSACTION_TYPE_IDS.EXPENCE
    ? 'sort-down'
    : 'sort-up';
}

function glyphStylesByTransactionTypeId(transactionTypeId, postfix: 'Large' | 'Default' | 'Small') {
  return transactionTypeId === TRANSACTION_TYPE_IDS.EXPENCE
    ? sizes[`amountIconExpence${postfix}`]
    : sizes[`amountIconIncome${postfix}`];
}

const sizesMap = {
  large: 'large',
  default: 'default',
  small: 'small',
}

interface TransactionAmountProps {
  transactionTypeId: number;
  amountStr: string;
  size: 'large' | 'default' | 'small';
}

const TransactionAmount = React.memo <TransactionAmountProps>(
  ({
  transactionTypeId,
  amountStr,
  size = 'default',
}) => {
  const theme = useColorScheme() ?? 'light';
  const color = Colors[theme].transaction[transactionTypeId] ?? "black";
  const postfix = size.charAt(0).toUpperCase() + size.slice(1);
  const iconSize = useMemo(() => {
    switch(size) {
      case sizesMap.large:
        return 26;
      case sizesMap.small:
        return 14;
      default:
        return 14;
    }
  }, [size]);


  return (
    <View style={[styles.amountContainer, sizes[`amountContainer${postfix}`]]}>
      <View style={glyphStylesByTransactionTypeId(transactionTypeId, postfix)}>
        <FontAwesome6
          name={glyphByTransactionTypeId(transactionTypeId)}
          size={iconSize}
          color={color}
        />
      </View>
      <Text
        style={[
          {
            color,
          },
          sizes[`amountText${postfix}`]
        ]}
      >
        {amountStr}
      </Text>
    </View>
  )
});

const styles = StyleSheet.create({
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const sizes = StyleSheet.create({
  amountContainerLarge: {
    height: 30,
    paddingRight: 4,
  },
  amountContainerDefault: {
    height: 22,
    paddingRight: 4,
  },
  amountContainerSmall: {
    height: 22,
    paddingRight: 4,
  },
  amountTextLarge: {
    fontSize: 22,
    fontWeight: 500,
    paddingLeft: 14,
  },
  amountTextSmall: {
    fontSize: 14,
    fontWeight: 400,
    paddingLeft: 4,
  },
  amountTextDefault: {
    fontSize: 15,
    fontWeight: 400,
    paddingLeft: 6,
  },
  amountIconExpenceLarge: {
    height: 30,
    marginBottom: 8,
  },
  amountIconExpenceDefault: {
    height: 22,
    marginTop: 2,
  },
  amountIconExpenceSmall: {
    height: 22,
    marginBottom: 1,
  },
  amountIconIncomeLarge: {
    height: 30,
    marginTop: 18,
  },
  amountIconIncomeSmall: {
    height: 30,
    marginTop: 22,
  },
  amountIconIncomeDefault: {
    height: 22,
    marginTop: 14,
  },
});

export { TransactionAmount };