import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default function BudgetPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, marginBottom: 50 }}>
        <View style={{ backgroundColor: 'white' }}>
          <Text>Budget Page</Text>
          <View>
            <MaterialIcons name={"warning-amber"} size={18} color={'#fdba74'} />
            <Text>Coming soon...</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
