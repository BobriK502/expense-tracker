import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  Pressable,
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
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  const data = useMemo(() => {
    return Array.from({ length: TOTAL_MONTHS }, (_, i) => i);
  }, []);

  const renderItem = useCallback(({ item: index }: { item: number }) => {
    const offset = INITIAL_INDEX - index;

    return <TransactionsPeriodView
      key={index}
      offset={offset}
      baseDate={today}
      isActive={currentIndex === index}
      preloadData={shouldPreloadData(currentIndex, index)}
    />;
  }, [currentIndex]);

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
      <Animated.View style={[styles.header, { height: HEADER_MAX_HEIGHT, elevation: 1 }]}>
        <View style={header.title}>
          <Text style={header.titleText}>История</Text>
          <Pressable style={{ marginHorizontal: 5, padding: 8 }}>
            <FontAwesome6 name={"magnifying-glass"} size={18} />
          </Pressable>
          <Pressable style={{ marginHorizontal: 5, padding: 8 }}>
            <FontAwesome6 name={"filter"} size={18} />
          </Pressable>
        </View>
        <View style={header.periodIndicator}>
          <Text style={{ fontSize: 15 }}>
            {currentPeriod.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </Text>
        </View>
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
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    width: '100%',
    paddingRight: 20,
    marginBottom: 10,
  },
  periodIndicator: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF6FF',
  },
  titleText: {
    flex: 1,
    marginLeft: 20,
    color: 'black',
    fontSize: 18,
    fontWeight: 400,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    zIndex: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
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