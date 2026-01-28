import React from 'react';
import {
  View,
  Pressable,
} from 'react-native';
import {
  useRouter,
  usePathname,
} from 'expo-router';
import {
  Colors,
} from '@/constants/Colors';
import {
  useColorScheme,
} from '@/hooks/useColorScheme';
import {
  Feather,
} from '@expo/vector-icons';

const TABS = [
  { path: '/', icon: 'home'},
  { path: '/transactions', icon: 'pocket' },
  { type: 'button' },
  { path: '/budget', icon: 'pie-chart' },
  { path: '/more', icon: 'grid' },
];

export default function CustomTabBar(): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const color = Colors[colorScheme ?? 'light'];
  const activeColor = color.tabIconSelected;
  const tabIconDefault = color.tabIconDefault;

  const handlePress = () => {
    router.push('/entities/new/transaction');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 50,
        borderTopWidth: 0.2,
        borderColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 20,
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      {TABS.map((tab) => {
        if (tab.type === 'button') {
          return <Pressable
            style={{
              height: 40,
              width: 40,
              borderRadius: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: color.btnPrimaryColor,
              elevation: 0.2,
            }}
            onPress={handlePress}
          >
            <Feather name="plus" size={18} color='black' />
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
          <Feather
            size={22}
            name={tab.icon}
            color={isActive(tab.path) ? activeColor : tabIconDefault}
          />
        </Pressable>
        );
      })}
    </View>
  );
}