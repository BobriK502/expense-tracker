 import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import Animated from 'react-native-reanimated';

import DashboardView from '@/components/views/dashboard/index'

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, marginBottom: 50 }}>
        <Animated.ScrollView showsVerticalScrollIndicator={false}>
         <DashboardView />
        </Animated.ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
