 import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import Animated from 'react-native-reanimated';

import { ActionButton } from '@/components/buttons/actionButton';
import DashboardView from '@/components/views/dashboard/index'

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
        >
         <DashboardView />
        </Animated.ScrollView>
      </SafeAreaView>
      {/* <ActionButton /> */}
    </SafeAreaProvider>
  );
}
