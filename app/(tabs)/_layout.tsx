import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="arrow.counterclockwise"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="creditcard.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="circle.grid.3x3"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
