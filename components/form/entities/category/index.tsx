import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { TransparentButton } from '@/components/buttons/transparent';
import { useCategoriesState } from '@/states/categories.state';
import { MojiIcon } from '@/components/ui/MojiIcon';
import { updateCategory } from '@/db/categories/index';
import { useBottomSheet } from '@/states/bottomSheet.state';

function CategoryForm(): React.JSX.Element {
  const openBottomSheet = useBottomSheet((state) => state.setIsOpen);
  const setBottomSheetView = useBottomSheet((state) => state.setActiveView);
  const editCategory = useCategoriesState((state) => state.editCategory);
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const onEditIcon = () => {
    setBottomSheetView('icon');
    openBottomSheet(true);
  }

  const onSubmit = async () => {
    await updateCategory(editCategory);
    router.back();
  };

  const handleFormSubmit = handleSubmit(onSubmit);
  return (
    <View style={{
      paddingTop: 150,
      backgroundColor: '#fafafa',
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
      }}>
      <Pressable
        onPress={onEditIcon}
        style={{ height: 120, width: 120, borderRadius: '50%', backgroundColor: editCategory.color, justifyContent: 'center', alignItems: 'center' }}
      >
        <MojiIcon iconId={editCategory.iconId} height={50} width={50} />
      </Pressable>
      <View style={formButtonStyles.container}>
        <TransparentButton
          label={"Готово"}
          onPress={handleFormSubmit}
        />
      </View>
    </View >
  )
}

const formButtonStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 60,
    gap: 4,
  },
  button: {
    width: 120,
    marginRight: 14,
  }
})

export { CategoryForm };