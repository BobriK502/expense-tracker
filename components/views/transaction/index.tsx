import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  interpolateColor,
} from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';

import {
  TransactionsPeriodView,
} from '@/components/views/transaction/periodView';
import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
} from '@/components/views/transaction/config.ui';
import {
  getDateByOffset
} from '@/components/views/transaction/helpers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


function shouldPreloadData(activeIndex: number, index: number) {
  return index >= activeIndex - 2 || index <= activeIndex + 2;
}

const TOTAL_MONTHS = 50;
const INITIAL_INDEX = Math.floor(TOTAL_MONTHS / 2);

const TransactionsView = () => {
  const today = new Date();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const scrollY = useSharedValue(0);

  const data = useMemo(() => {
    return Array.from({ length: TOTAL_MONTHS }, (_, i) => i);
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrollPosition(
        Math.min(
          event.nativeEvent.contentOffset.y,
          HEADER_MAX_HEIGHT - 100,
        ),
      );
    },
    [],
  )

  const headerStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [0, 2],
      Extrapolation.CLAMP
    );

    const height = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolation.CLAMP
    );

    return {
      elevation,
      height,
    };
  });

  const renderItem = useCallback(({ item: index }: { item: number }) => {
      const offset = INITIAL_INDEX - index;

    return <TransactionsPeriodView
      key={index}
      offset={offset}
      baseDate={today}
      isActive={currentIndex === index}
      onScroll={onScroll}
      scrollPosition={scrollPosition}
      scrollY={scrollY}
      preloadData={shouldPreloadData(currentIndex,index)}
    />;
  }, [currentIndex, scrollPosition]);

  const keyExtractor = useCallback((index: number) => {
    const offset = INITIAL_INDEX - index;
    const period = getDateByOffset(today, offset);
    return `${period}`;
  }, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    []
  );

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: {
      viewableItems: any;
      changed: unknown;
    }) => {
      if (viewableItems.length > 0) {
        const visibleIndex = viewableItems[0].index;
        if (Math.abs(visibleIndex - currentIndex) >= 1) {
          setCurrentIndex(visibleIndex);
        }
      }
    },
    [currentIndex]
  );

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 90,
    }),
    []
  );

  const currentPeriod = getDateByOffset(
    today,
    INITIAL_INDEX - currentIndex,
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={header.title}>
          <Text style={header.titleText}>История Транзакций</Text>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', alignItems: 'center', backgroundColor: 'white', paddingBottom: 10, paddingTop: 5, borderBottomWidth: 1, borderBottomColor: '#EEF6FF' }}>
          <Text style={{ fontSize: 15 }}>{currentPeriod.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</Text>
        </View>
        <Pressable style={{ position: 'absolute', top: 65, right: 30 }}>
          <FontAwesome6 name={"filter"} size={18} />
        </Pressable>
      </Animated.View>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialScrollIndex={INITIAL_INDEX}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewableItemsChanged}
        style={styles.flatList}
        decelerationRate="fast"
        removeClippedSubviews={false}
        windowSize={10}
      />
    </View>
  );
};

const header = StyleSheet.create({
  container: {
    zIndex: 10,
    top: 0,
    right: 0,
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  title: {
    position: 'absolute',
    bottom: 55,
    left: 24,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'white',
  },
  flatList: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});


export { TransactionsView }