import { View, Pressable, Text } from 'react-native';

import { useBottomSheet } from '@/states/bottomSheet.state';

import { useCategoriesState } from '@/states/categories.state';
import { useMemo } from 'react';
import { MojiIcon } from '@/components/ui/MojiIcon';

const defaultCategory = {
  color: 'gray',
  title: 'Choose category',
  id: null,
  iconId: 'default'
}

function CategorySelect({
}) {
  const setIsOpen = useBottomSheet((state) => state.setIsOpen);
  const setBshActiveView = useBottomSheet((state) => state.setActiveView);
  const selectedCategoryId = useCategoriesState((state) => state.selectedCategoryId);
  const categories = useCategoriesState((state) => state.categories);
  const selectedCategory = useMemo(() => {
    return categories.find((cat) => cat.id === selectedCategoryId) || defaultCategory;
  }, [categories, selectedCategoryId])
  const handlePress = () => {
    setBshActiveView('categories');
    setIsOpen(true);
  }

  return (
    <View style={{ width: '100%', paddingLeft: 26, paddingRight: 26 }}>
      <View style={{ width: '100%', paddingLeft: 6, marginTop: 30, marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 400 }}>Category</Text>
      </View>
      <Pressable style={{ width: '100%', height: 50, backgroundColor: 'white', borderRadius: 10, elevation: 3 }} onPress={handlePress}>
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <View style={{ position: 'relative' }}>
            <View style={{
              width: 60,
              height: 50,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: selectedCategory.color,
              justifyContent: 'center',
              alignContent: 'center',
              opacity: 0.5,
            }}>
            </View>
            <View style={{ position: 'absolute', left: 10, top: 7 }}>
              <MojiIcon width={35} height={35} iconId={selectedCategory.iconId} />
            </View>
          </View>
          <View style={{ height: 50, width: 300, paddingTop: 15, marginLeft: 20, }}>
            <Text style={{ fontSize: 14, fontWeight: 300 }}>{selectedCategory.title}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export { CategorySelect };