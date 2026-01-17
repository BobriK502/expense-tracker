import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useBottomSheet } from '@/states/bottomSheet.state';
import { useCategoriesState } from '@/states/categories.state';
import Animated from 'react-native-reanimated';
import { MojiIcon, iconsMap } from '@/components/ui/MojiIcon';
import {
  useCloseAction,
} from '@/components/bottomSheet/hooks/useCloseAction';


function IconSelectBottomSheet() {
  const setIsOpen = useBottomSheet((state) => state.setIsOpen);
  const setView = useBottomSheet((state) => state.setActiveView);
  const handlePress = () => setIsOpen(false);
  const editCategory = useCategoriesState((state) => state.editCategory);
  const setEditCategory = useCategoriesState((state) => state.setEditCategory);

  useCloseAction();

  const renderCategory = (itemKey: string) => (
    <TouchableOpacity
      style={{ flexDirection: 'column', height: 60, width: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10, }}
      onPress={() => {
        setEditCategory({ ...editCategory, iconId: itemKey });
        setIsOpen(false);
        setView('');
      }}
      key={itemKey}
      activeOpacity={0.8}
    >
      <View style={{
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <MojiIcon iconId={itemKey} width={45} height={45} />
      </View>
    </TouchableOpacity>
  );

  const renderItems = () => {
    return Object.keys(iconsMap || {}).reduce((acc, key) => {
      if (acc.at(-1) === undefined || acc.at(-1)?.length === 5) {
        const group = [];
        group.push(key);
        acc.push(group);
        return acc;
      }

      acc.at(-1)!.push(key);
      return acc;
    }, [] as Array<Array<any>>).map((group, index) => {
      return (
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', width: '100%' }} key={index}>
          {group.map((iconKey) => renderCategory(iconKey))}
        </View>
      )
    });
  }


  return (
    <View>
      <Animated.ScrollView
        style={{
          height: 400,
          width: 400,
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
        contentContainerStyle={{ justifyContent: 'center' }}
      >
        {renderItems()}
      </Animated.ScrollView>
      <Pressable onPress={handlePress}>
        <Text>Categories</Text>
      </Pressable>
    </View>

  )
}

export { IconSelectBottomSheet };
