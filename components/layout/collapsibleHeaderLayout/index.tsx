import { getText } from '@/services/localization';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ExpencesMainHeader } from '@/components/headers/expencesHeader/expencesMainHeader';
import { ExpencesCollapsedHeader } from '@/components/headers/expencesHeader/expencesCollapsedHeader';
import { useCollapsibleHeader } from '@/components/layout/collapsibleHeaderLayout/hooks/useCollapsibleHeader';
import {
  HEADER_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  AVATAR_MAX_SIZE,
  AVATAR_MIN_SIZE,
  SCROLL_RANGE,
  AVATAR_X_MIN,
  AVATAR_Y_MIN,
} from '@/components/layout/collapsibleHeaderLayout/constants';
import { Colors } from '@/constants/Colors';

const StickyHeaderLayout = ({ children }) => {
  const {
    collapsedHeaderStyle,
    collapsedIconStyle,
    headerStyle,
    scrollHandler,
  } = useCollapsibleHeader();
    const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        }
      ]}
    >
      <ExpencesCollapsedHeader
        extraStyles={collapsedHeaderStyle}
        height={HEADER_MIN_HEIGHT}
        iconExtraStyles={collapsedIconStyle}
        paddingHorizontal={12+16+AVATAR_MIN_SIZE}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_MIN_HEIGHT }}
      >
        <ExpencesMainHeader
          extraStyles={headerStyle}
          height={HEADER_MAX_HEIGHT}
          iconSize={AVATAR_MAX_SIZE}
        />
        <View style={styles.content}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 30,
  },
});

export { StickyHeaderLayout };