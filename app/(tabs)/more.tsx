import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { MoreLayout } from '@/components/views/more';

export default function SettingsPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, marginBottom: 50 }}>
        <MoreLayout />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
