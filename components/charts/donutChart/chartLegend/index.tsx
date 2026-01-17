import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { LegendItem } from './legendItem';

import { type ChartDataItem } from '../types';
import { ThemedText } from '@/components/ThemedText';

type ChartLegendProps = {
  chartData: Array<ChartDataItem>;
  onPress: (item: ChartDataItem, index: number) => void;
  focusedItemIndex: number;
}

function ChartLegend(props: ChartLegendProps): React.JSX.Element {
  const legendRef = useRef<null | FlatList>(null);
  const handlePress = (item: ChartDataItem): void => {
    const index: number = props.chartData.indexOf(item);

    if (index === -1) {
      return;
    }

    props.onPress(item, index);
  }

  useEffect(() => {
    if (legendRef.current) {
      legendRef.current.scrollToIndex({
        animated: true,
        index: props.focusedItemIndex,
      });
    }
  }, [props.focusedItemIndex])

  return (
    <View style={styles.chartLegendContainer}>
      <FlatList
        ref={legendRef}
        data={props.chartData}
        horizontal
        pagingEnabled
        renderItem={({ item: chartDataItem }) => {
          return <LegendItem
              key={chartDataItem.label}
              item={chartDataItem}
              onPress={handlePress}
            />
        }}
        contentContainerStyle={{
          paddingTop: 5,
          paddingRight: 10,
          paddingBottom: 5,
          paddingLeft: 10,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  legendItemsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  chartLegendContainer: {
    flexDirection: 'column',
    width: '100%',
    height: 80,
    marginTop:40,
  },
  totalValueContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 30,
  },
  totalValueAmount: {
    marginRight: 10,
    fontSize: 25,
    fontWeight: 500,
    color: '#848484ff'
  },
  totalValueCurrency: {
    fontSize: 14,
    fontWeight: 700,
  }
})

export { ChartLegend };