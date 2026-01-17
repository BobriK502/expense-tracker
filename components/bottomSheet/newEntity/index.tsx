import { View, Text } from 'react-native';
import { useBottomSheet } from '@/states/bottomSheet.state';
import Animated from 'react-native-reanimated';
import { ListItem } from '@/components/bottomSheet/newEntity/listItem';
import {
  useCloseAction,
} from '@/components/bottomSheet/hooks/useCloseAction';
import { entitiesConfig } from '@/components/bottomSheet/newEntity/config';


function NewEntityBottomSheet() {
  const setIsOpen = useBottomSheet((state) => state.setIsOpen);
  const setActiveBshView = useBottomSheet((state) => state.setActiveView);
  const handleClose = () => {
    setIsOpen(false);
    setActiveBshView('');
  };

  useCloseAction();

  return (
    <View style={{ width: '100%', padding: 20, position: 'absolute', top: 0 }}>
      <Animated.View style={{ marginTop: 16, marginBottom: 10 }}>
        {entitiesConfig.map((entity) => (
          <ListItem
            entity={entity}
            key={entity.key}
            onBottomSheetClose={handleClose}
          />
        ))}
      </Animated.View>
    </View>

  )
}

export { NewEntityBottomSheet };
