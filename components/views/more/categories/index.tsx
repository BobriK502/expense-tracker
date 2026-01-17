import React, { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { selectCategories } from '@/db/categories'

import { useCategoriesState } from '@/states/categories.state';
import { MojiIcon } from '@/components/ui/MojiIcon';

function SettingsCategoriesList() {
  const router = useRouter();
  const categories = useCategoriesState((state) => state.categories);
  const setCategories = useCategoriesState((state) => state.setCategories);
  const setEditCategory = useCategoriesState((state) => state.setEditCategory);

  const onCategoryPress = (cat: any) => {
    setEditCategory(cat);
    router.push('/entities/edit/category');
  }

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRaw = await selectCategories();
      setCategories(categoriesRaw as Array<never>);
    }
    fetchData();
  }, []);

  return (
    <Animated.ScrollView
      style={{ width: '100%' }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: 100, paddingBottom: 100 }}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onCategoryPress(category)}
          activeOpacity={0.9}
          style={{ backgroundColor: 'white', width: 320, marginTop: 10, borderRadius: 10, padding: 5, flexDirection: 'row', alignItems: 'center' }}
        >
          <View style={{ height: 50, width: 50, borderRadius: '50%', backgroundColor: category.color, justifyContent: 'center', alignItems: 'center' }}>
            <MojiIcon iconId={category.iconId} width={35} height={35} />
          </View>
          <Text style={{ marginLeft: 10 }}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </Animated.ScrollView>
  )
}

export { SettingsCategoriesList };
