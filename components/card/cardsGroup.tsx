import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';

import {
  formatAmountStr,
} from '@/helpers/transactions/amountFormatter';

interface CardGroupProps {
  title: string;
  summary: number;
  children: React.ReactNode;
}

function CardGroup({
  title,
  children,
  summary,
}: CardGroupProps): React.JSX.Element {
  return (
    <View style={styles.group}>
      <View style={styles.titleContainer}>
        <Text style={styles.titile}>{title}</Text>
        {Boolean(summary) && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summary}>= {formatAmountStr(summary)}</Text>
          </View>)
        }
      </View>
      <View style={styles.innerContainer}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    display: 'flex',
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 5,
  },
  titile: {
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 400,
    color: 'gray',
  },
  summaryContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summary: {
    color: 'gray',
    fontSize: 14,
    marginRight: 5,
  },
  titleContainer: {
    marginLeft: 3,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor: 'lightgray',
    paddingHorizontal: 10,

  },
  innerContainer: {
    marginTop: 5,
  }
});

export { CardGroup };
