import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { CategoryForm } from '@/components/form/entities/category';

export default function EditCategoryPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CategoryForm />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
