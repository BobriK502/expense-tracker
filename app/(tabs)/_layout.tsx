// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import TabBarBackground from '@/components/ui/TabBarBackground';
import CustomTabBar from '@/app/(tabs)/customTabs';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // ← скрываем стандартный tabBar
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Главная' }} />
        <Tabs.Screen name="transactions" options={{ title: 'Транзакции' }} />
        <Tabs.Screen name="budget" options={{ title: 'Бюджет' }} />
        <Tabs.Screen name="more" options={{ title: 'Ещё' }} />
      </Tabs>

      {/* Кастомный фон и панель */}
      {/* <TabBarBackground /> */}
      <CustomTabBar />
    </>
  );
}