import {
  View,
  Pressable,
  Text,
  FlatList,
} from 'react-native';
import { useMemo } from 'react';

import { useCategoriesState } from '@/states/categories.state';
import { MojiIcon } from '@/components/ui/MojiIcon';

const defaultCategory = {
  color: 'gray',
  title: 'Choose category',
  id: null,
  iconId: 'default'
}

interface CategorySelectProps {
  categoryId: number | null;
}

function CategorySelect({
  categoryId,
}: CategorySelectProps) {
  const selectedCategoryId = useCategoriesState((state) => state.selectedCategoryId);
  const setSelectedCategoryId = useCategoriesState((state) => state.setSelectedCategoryId);
  const categories = useCategoriesState((state) => state.categories);
  const selectedCategory = useMemo(() => {
    return selectedCategoryId || categoryId;
  }, [selectedCategoryId, categoryId])

  return (
    <View style={{ height: 40, width: '100%', marginBottom: 5, overflow: 'visible' }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedCategory;

          return (
            <Pressable
              key={item.id}
              style={{
                height: 40,
                marginRight: 10,
              }}
              onPress={() => {
                setSelectedCategoryId(item.id);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 4,
                  paddingRight: 15,
                  paddingLeft: 10,
                  borderRadius: 10,
                  backgroundColor: isSelected ? item.color : '#F4F4F5',
                }}
              >
                <View style={{
                  backgroundColor: item.color,
                  padding: 2,
                  borderRadius: '50%',
                  marginRight: 12,
                }}>
                  <MojiIcon iconId={item.iconId} width={20} height={20} />
                </View>
                <Text
                  style={{
                    color: isSelected ? 'white' : 'black',
                    fontWeight: 500,
                  }}
                >{item.title}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  )
}

export { CategorySelect };