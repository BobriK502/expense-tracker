// components/CustomTabBar.tsx
import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { FontAwesome6 } from '@expo/vector-icons';
import { useBottomSheet } from '@/states/bottomSheet.state';

const TABS = [
  { path: '/', icon: 'house.fill'},
  { path: '/transactions', icon: 'arrow.counterclockwise' },
  { type: 'button' },
  { path: '/budget', icon: 'creditcard.fill' },
  { path: '/more', icon: 'circle.grid.3x3' },
];

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tabIconSelected;
  const inactiveColor = '#94a3b8';
  const setActiveBshView = useBottomSheet((state) => state.setActiveView);
  const setIsBshOpen = useBottomSheet((state) => state.setIsOpen);

  const handlePress = () => {
    setActiveBshView('newEntity');
    setIsBshOpen(true);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        borderTopWidth: 0.2,
        borderColor: 'lightgray',
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 20,
        backgroundColor: 'white'
      }}
    >
      {TABS.map((tab) => {
        if (tab.type === 'button') {
          return <Pressable
            style={{
              marginTop: 5,
              height: 40,
              width: 40,
              borderRadius: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff085',
              elevation: 0.2,
            }}
            onPress={handlePress}
          >
            <FontAwesome6 name="plus" size={14} color='block' />
          </Pressable>
        }
        return (
        <Pressable
          key={tab.path}
          onPress={() => router.push(`/(tabs)/${tab.path}` as any)}
          style={{
            alignItems: 'center',
            padding: 8,
            height: 45,
            width: 70,
          }}
        >
          <IconSymbol
            size={28}
            name={tab.icon}
            color={isActive(tab.path) ? activeColor : inactiveColor}
          />
        </Pressable>
        );
      })}
    </View>
  );
}