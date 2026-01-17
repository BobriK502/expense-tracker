import { View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import React from 'react';

import { ThemedText } from '@/components/ThemedText';

import { ChartDataItem } from '@/types/entities/categories';


type LegendItemProps = {
  item: ChartDataItem;
  onPress: (item: ChartDataItem) => void;
}

const { width: WINDOW_WIDTH } = Dimensions.get('window');

function LegendItem(props: LegendItemProps): React.JSX.Element {
  const handlePress = (): void => {
    props.onPress(props.item);
  }

  return (
    <View
      style={[
        styles.legendItem,
       { width: WINDOW_WIDTH },
      ]}
    >
      <TouchableHighlight
        style={styles.legendItemInner}
        onPress={handlePress}
        underlayColor={'#f8f7f7ff'}
      >
        <View>
          <View
            style={[
              styles.category,
              {
                backgroundColor: props.item.focused
                  ? props.item.gradientCenterColor
                  : props.item.color,
              },
            ]}
          />
          <View>
            <ThemedText
              style={styles.legendLabel}
              lightColor='#a5a5a5ff'
              darkColor='#a5a5a5ff'
            >
              {props.item.label}
            </ThemedText>
          </View>
        </View>

      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  category: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    width: 15,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 2,
  },
  legendItem: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 20,
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    borderRadius: 10,
  },
  legendItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 120,
    height: 30,
  },
  legendLabel: {
    flexDirection: 'row',
    height: 15,
    maxWidth: 90,
    overflow: 'hidden',
    fontSize: 12,
    lineHeight: 15,
    textShadowColor: 'rgba(246, 235, 235, 0.75)',
    textShadowOffset: { width: -0.2, height: 0.2 },
    textShadowRadius: 1,
  }
});

export { LegendItem };