import React from 'react';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { getText } from '@/services/localization';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ExpencesMainHeaderProps = {
  extraStyles: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  height: number;
  iconSize: number;
}

function ExpencesMainHeader({
  extraStyles,
  height,
  iconSize,
}: ExpencesMainHeaderProps): React.JSX.Element {
  const colorScheme = useColorScheme() ?? 'light';
    return (
        <Animated.View
          style={[
            {
              height,
              backgroundColor: Colors[colorScheme].background,
            },
            styles.header,
            extraStyles
          ]}
        >
            <View
              style={[
                {
                  width: iconSize,
                  height: iconSize,
                  borderRadius: iconSize / 2,
                },
                styles.icon,
              ]}
              />
            <ThemedText style={styles.title}>{getText('expences_tab_title')}</ThemedText>
            <ThemedText style={styles.subtitle}>{getText('expences_in_period')}</ThemedText>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    marginTop: -55,
  },
  subtitle: {
    color: '#2e2e33ff',
    fontSize: 16,
    marginTop: 6,
  },
   icon: {
    backgroundColor: '#9c9b9bff',
    marginBottom: 16,
  },
  title: {
    color: '#2e2b2bff',
    fontSize: 24,
    fontWeight: '700',
  },
})

export { ExpencesMainHeader };
