import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  useEffect,
  useRef,
} from 'react';
import {
  useSharedValue,
  withTiming,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import {
  Canvas,
  Group,
} from '@shopify/react-native-skia';


import {
  formatCurrencyCompact,
} from '@/helpers/number/analytic/formatCurrencyCompact';

const {
  width
} = Dimensions.get('window');

import {
  CategoryBar,
} from '@/components/chart/categoryChart/categoryBar/categoryBar';
import { hexWithOpacity } from '@/helpers/color/hexOpacity';

function CategoryChart({
  data,
  onSelect,
}) {
  const progress = useSharedValue<number>(0);
  const xOffset = useSharedValue(0);

  const dataClickableX = data.map((_, index) => {
    return {
      test: (val) => val > 10 + (index * (60)) && val < 10 + (index * (60 + 10)) + 60,
      index,
    };
  })

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onChange((event) => {
      const visibleItems = Math.ceil(width / 70);

      if (data.length < visibleItems) return;

      let newVal = xOffset.value + event.changeX;

      newVal = Math.min(0, newVal);
      newVal = Math.max(((data.length - visibleItems) * -70) - 20, newVal)
      xOffset.value = newVal;
    });
  
  const checkIndex = (val = 0) => {
    const pos = dataClickableX.find((x) => x.test(val));

    if (pos) {
      onSelect(pos.index);
    }
  }

  const tapGesture = Gesture.Tap().onEnd((e) => {
    'worklet'
    runOnJS(checkIndex)(e.absoluteX - xOffset.value);
  });

  const composed = Gesture.Exclusive(panGesture, tapGesture);

  const vals = data.map((item) => item.total);
  const maxVal = Math.max(...vals);
  const minVal = Math.min(...vals)
  const step = (maxVal - minVal) / 4;

  const dataRanges = Array.from({ length: 5 }).map((_, ind) => {
    return Math.ceil(minVal + step * ind);
  });

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 1000 });
  }, [progress, data]);


  useEffect(() => {
    xOffset.value = 0;
  }, [data])

  const transform = useDerivedValue(() => {
    return [
      { translateX: xOffset.value },
    ];
  }, [xOffset]);

  return (
    <View
      style={CategoryChartStyle.container}
    >
      <GestureDetector gesture={composed}>
        <Canvas style={{ flex: 1, height: 400, backgroundColor: hexWithOpacity('#F4F4F5', 0.4) }}>
          <Group transform={transform}>
            {data.map((item, index) => {
              const height = Math.round((item.total / maxVal) * 268) + 32;
              return (
                <Group>
                  <CategoryBar
                    index={index}
                    color={item.color}
                    height={height}
                    progress={progress}
                    label={formatCurrencyCompact(item.total)}
                  />
                </Group>
              );
            })}
          </Group>
        </Canvas>
      </GestureDetector>
    </View>
  )
}

const CategoryChartStyle = StyleSheet.create({
  container: {
    height: 400,
  }
})

export { CategoryChart };