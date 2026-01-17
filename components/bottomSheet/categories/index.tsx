import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useBottomSheet } from '@/states/bottomSheet.state';
import { useCategoriesState } from '@/states/categories.state';
import Animated from 'react-native-reanimated';
import { MojiIcon } from '@/components/ui/MojiIcon';
import { hexWithOpacity } from '@/helpers/color/hexOpacity';
import {
  useCloseAction,
} from '@/components/bottomSheet/hooks/useCloseAction';


function CategoriesBottomSheet() {
  const setIsOpen = useBottomSheet((state) => state.setIsOpen);
  const selectedCategoryId = useCategoriesState((state) => state.selectedCategoryId);
  const selectCategory = useCategoriesState((state) => state.setSelectedCategoryId);
  const categories = useCategoriesState((state) => state.categories);

  useCloseAction();

  const renderCategory = (item) => {
    return <TouchableOpacity
      style={{ flexDirection: 'column', height: 100, width: 90, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', padding: 5, marginLeft: 2, marginRight: 2, borderRadius: 10, }}
      onPress={() => {
        selectCategory((item as { id: number }).id);
        setIsOpen(false);
      }}
      key={item.title}
      activeOpacity={0.8}
    >
      <View style={{
        backgroundColor: hexWithOpacity(item.color, 0.5),
        height: 75,
        width: 75,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <MojiIcon iconId={item.iconId} width={50} height={50} />
      </View>
      <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: 400, paddingTop: 2 }}>{item.title}</Text>
    </TouchableOpacity>
  };

  const renderItems = () => {
    return categories.reduce((acc, item) => {
      if (acc.at(-1) === undefined || acc.at(-1)?.length === 4) {
        const group = [];
        group.push(item);
        acc.push(group);
        return acc;
      }

      acc.at(-1)!.push(item);
      return acc;
    }, [] as Array<Array<any>>).map((group, index) => {
      return (
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, alignItems: 'center' }} key={index}>
          {group.map(renderCategory)}
        </View>
      )
    });
  }


  return (
    <View>
      <View style={{ display: 'flex', width: '100%' }}>
        <Text style={{ fontSize: 19, paddingLeft: 6, paddingBottom: 5 }}>Выберите категорию</Text>
      </View>
      <Animated.ScrollView
        style={{
          height: 400,
          width: '100%',
          flexWrap: 'wrap',
        }}
        contentContainerStyle={{
          flexDirection: 'column',
        }}
      >
        {renderItems()}
      </Animated.ScrollView>
    </View>

  )
}

export { CategoriesBottomSheet };
