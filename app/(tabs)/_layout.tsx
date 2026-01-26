import {
  Tabs,
} from 'expo-router';
import React from 'react';

import CustomTabBar from '@/app/(tabs)/customTabs';

export default function TabLayout(): React.JSX.Element {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Главная' }} />
        <Tabs.Screen name="transactions" options={{ title: 'Транзакции' }} />
        <Tabs.Screen name="budget" options={{ title: 'Бюджет' }} />
        <Tabs.Screen name="more" options={{ title: 'Ещё' }} />
      </Tabs>
      <CustomTabBar />
    </>
  );
}