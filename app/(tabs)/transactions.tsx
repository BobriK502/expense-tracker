import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  TransactionsView,
} from '@/components/views/transaction';


export default function ExpencesPage() {
  return (
    <SafeAreaProvider style={{ flex: 1, marginBottom: 50 }}>
      <TransactionsView />
    </SafeAreaProvider>
  );
}
