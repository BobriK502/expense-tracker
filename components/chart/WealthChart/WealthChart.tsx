import {
  Canvas,
  Group,
} from '@shopify/react-native-skia';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useRef } from 'react';

import {
  LegendContainer,
} from '@/components/chart/WealthChart/Legend/LegendContainer';
import {
  BarStack,
} from './BarStack';

const width = Dimensions.get('window').width * 0.9;

export type WealthChartItem = {
  name: string;
  color: string;
  value: number;
}

type WealthChartProps = {
  items: Array<WealthChartItem>;
  onPress: (selectedItemName: string) => void;
};

function WealthChart({
  items,
}: WealthChartProps): React.JSX.Element {
  const prW = useRef<number>(0);
  const total = items.reduce((acc, item) => acc + Math.max(item.value, 0), 0);

  return (
    <View style={WealthChartStyles.contnainer} >
      <Canvas style={{ height: 45, width, backgroundColor: 'white',}}>
        <Group>
          {items.map((item, index) => {
            const widthVal = Math.ceil((Math.max(item.value, 0) / total) * (width - (6 * (items.length + 1))));
            const offset = index === 0 ? 6 : prW.current + ((index + 1) * 6);
            prW.current = index === items.length - 1 ? 0 : widthVal + prW.current;

            return <BarStack color={item.color} val={widthVal} offset={offset} />;
          })}
        </Group> 
      </Canvas>
      <View style={WealthChartStyles.legend}>
        <LegendContainer items={items} />
      </View>
    </View>
  );
}

const WealthChartStyles = StyleSheet.create({
  contnainer: {

  },
  legend: {
    width: '100%',
  }
});

export { WealthChart };
