import { View, Text, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import {
  exportDatabase,
} from '@/db/export';
import {
  exportFullDatabaseDump,
} from '@/db/dump';
import { dropTables, reinitDb } from '@/db';

function MoreLayout() {
  const router = useRouter();

  const handleRemoveTable = async () => {
    await dropTables();
    await reinitDb();
  }

  const openCategories = () => router.push('/settings/categoriesList');

  const exportDB = () => {
    exportDatabase();
  }

  const exportDump = () => {
    exportFullDatabaseDump();
  }

  return (
    <Animated.ScrollView>
      <View>
        <Pressable onPress={handleRemoveTable} style={{ display: 'flex', color: 'white' }}>
          <Text style={{ fontSize: 20 }}>Clear db</Text>
        </Pressable>
        <Pressable onPress={openCategories} style={{ display: 'flex', color: 'white' }}>
          <Text style={{ fontSize: 20 }}>OpenCategories</Text>
        </Pressable>
        <Pressable onPress={exportDB} style={{ display: 'flex', color: 'white' }}>
          <Text style={{ fontSize: 20 }}>Export db</Text>
        </Pressable>
        <Pressable onPress={exportDump} style={{ display: 'flex', color: 'white' }}>
          <Text style={{ fontSize: 20 }}>Export dump</Text>
        </Pressable>
      </View>
    </Animated.ScrollView>
  )
}

export { MoreLayout };