import React from 'react';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { getText } from '@/services/localization';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ExpencesCollapsedHeaderProps = {
  extraStyles: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  iconExtraStyles: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  height: number;
  paddingHorizontal: number;
}

function ExpencesCollapsedHeader({
  extraStyles,
  iconExtraStyles,
  height,
  paddingHorizontal,
}: ExpencesCollapsedHeaderProps): React.JSX.Element {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Animated.View
      style={[
        {
          backgroundColor: Colors[colorScheme].background,
          height,
          paddingHorizontal,
        },
        styles.header,
        extraStyles,
      ]}
    >
      <Animated.View style={[styles.icon, iconExtraStyles]} />
      <ThemedText style={styles.title}>{getText('expences_tab_title')}</ThemedText>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#ffffffff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export { ExpencesCollapsedHeader };
