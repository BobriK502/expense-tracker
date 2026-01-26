import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
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

import {
  TransactionsPeriodView,
} from '@/components/views/transaction/periodView';
import {
  HEADER_MAX_HEIGHT,
} from '@/components/views/transaction/config.ui';
import {
  getDateByOffset
} from '@/components/views/transaction/helpers';
import {
  Colors,
} from '@/constants/Colors';
import {
  useColorScheme,
} from '@/hooks/useColorScheme';
import { PeriodTabs } from './periodTabs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


function shouldPreloadData(activeIndex: number, index: number) {
  return index >= activeIndex - 2 || index <= activeIndex + 2;
}

const TOTAL_MONTHS = 18;
const INITIAL_INDEX = Math.floor(TOTAL_MONTHS / 2);

const TransactionsView = () => {
  const today = new Date();
  const activeTimeout = useRef<NodeJS.Timeout | null> (null);
  const isScrolling = useRef<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | null>(null);
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light'];
  const periodViewRef = useRef<Animated.FlatList<Date> | null>(null);

  const data = useMemo(() => {
    return Array
      .from({ length: TOTAL_MONTHS }, (_, i) => i)
      .map((i) => {
        const offset = INITIAL_INDEX - i;
        return getDateByOffset(today, offset)
      });
  }, []);

  const renderItem = useCallback(({ item, index }: { item: Date, index: number }) => {
    return <TransactionsPeriodView
      key={index}
      period={item}
      isActive={currentIndex === index}
      preloadData={shouldPreloadData(currentIndex, index)}
    />;
  }, [currentIndex]);

  const keyExtractor = useCallback((period: Date) => {
    return `${period}`;
  }, []);

  const handleSelectPeriod = useCallback((ind: number) => {
    if (periodViewRef.current) {
      setSelectedTabIndex(ind);
      periodViewRef.current.scrollToIndex({ index: ind, animated: true })
    }
  }, [])

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
        const itemInd = viewableItems[0].index;
        if (!selectedTabIndex || itemInd === selectedTabIndex)
          new Promise((resolve) => {
            setCurrentIndex(itemInd);
            resolve({});
          }).then(() => {
            setSelectedTabIndex(null);
          })
      }
    },
    [selectedTabIndex]
  );

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 90,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: HEADER_MAX_HEIGHT, backgroundColor: 'white' }]}>
        <View style={header.title}>
          <Text style={header.titleText}>История</Text>
        </View>
        <PeriodTabs
          periodData={data}
          currentIndex={selectedTabIndex || currentIndex}
          onSelectPeriod={handleSelectPeriod}
        />
      </Animated.View>
      <Animated.FlatList
        ref={periodViewRef}
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
        onScrollToIndexFailed={(info) => {
          const wait = new Promise(resolve => setTimeout(resolve, 100));
          wait.then(() => {
            periodViewRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
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
    marginBottom: 5,
  },
  periodIndicator: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 5,
    borderBottomWidth: 1,
  },
  titleText: {
    flex: 1,
    marginLeft: 28,
    color: 'black',
    fontSize: 20,
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
    justifyContent: 'flex-end',
    paddingBottom: 20,
    elevation: 1,
  },
  flatList: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 600,
  },
});


export { TransactionsView }