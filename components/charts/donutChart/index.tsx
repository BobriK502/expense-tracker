import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PieChart } from "react-native-gifted-charts";

import { getText } from '@/services/localization';
import { getChartData, getFocusedItemIndex } from '@/services/dashboard';
import { ThemedText } from '@/components/ThemedText';
import { ChartLegend } from './chartLegend';

import { type ChartDataItem } from '@/types/entities/categories';

function DonutChart(): React.JSX.Element {
  const [chartData, updateChartData] = useState(getChartData())
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)

  const handlePress = (item: ChartDataItem, index: number) => {
    updateChartData((currChartData: Array<ChartDataItem>) => {
      return currChartData
        .map((currDataItem: ChartDataItem, currInd) => ({ ...currDataItem, focused: currInd === index }));
    });
    setFocusedItemIndex(index);
  }

  const focusedItem = useMemo(() => {
    return chartData
      .find((chartDataItem: ChartDataItem) => chartDataItem.focused);
  }, [chartData]);

  return (
      <View style={style.chartContainer}>
        <View style={style.chart}>
          <PieChart
            donut
            isAnimated
            animationDuration={2}
            showGradient
            sectionAutoFocus
            innerRadius={90}
            radius={130}
            data={chartData}
            onPress={handlePress}
            centerLabelComponent={() => {
              if (!focusedItem) return null;
              return (
                <View style={style.chartInnerData}>
                  <Text style={style.chartInnerValue}>{focusedItem.value}%</Text>
                  <Text style={style.chartInnerLabel}>{focusedItem.label}</Text>
                  <View style={style.chartInnerAmountContainer}>
                    <Text style={style.chartInnerAmount}>{focusedItem.totalValue}</Text>
                    <Text style={style.chartInnerAmountCurrency}>BYN</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <ChartLegend
          chartData={chartData}
          onPress={handlePress}
          focusedItemIndex={focusedItemIndex}
        />
      </View>
  );
}

const style = StyleSheet.create({
  chartWidged: {
    flexDirection: 'column',
    height: 410,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#ffffffe6',
    borderRadius: 40,
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 410,
    width: '100%',
  },
  chart: {
    top: 30,
    width: '100%',
    alignItems: 'center',
  },
  chartInnerData: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartInnerValue: {
    fontSize: 30,
    fontWeight: 500,
  },
  chartInnerLabel: {
    fontSize: 12,
    color: '#828282ff',
  },
  chartInnerAmountContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  chartInnerAmount: {
    fontSize: 18,
    color: '#000',
    fontWeight: 500,
  },
  chartInnerAmountCurrency: {
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 28,
    color: '#929292ff',
    fontWeight: 700,
  }
})

export { DonutChart };