import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useAssets } from 'expo-asset';

import { ExpenceFormHeader } from '@/components/form/entities/expence/expenceFormHeader';
import { getText } from '@/services/localization';
import { TransparentButton } from '@/components/buttons/transparent';
import { TransactionForm } from '@/components/form/entities/transactionForm/index'
import { createExpence } from '@/db/transactions/index';
import { selectCategoriesByType } from '@/db/categories/index';
import { TRANSACTION_TYPE_IDS } from '@/constants/config.entities';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import Animated from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { CategorySelect } from '@/components/form/inputs/categorySelect';
import { useCategoriesState } from '@/states/categories.state';
import { MojiIcon } from '@/components/ui/MojiIcon';
import { updateCategory } from '@/db/categories/index';
import { useBottomSheet } from '@/states/bottomSheet.state';

const defaultCategory = {
  color: 'gray',
  title: 'Choose category',
  id: null,
  iconId: 'default'
}

function CategoryForm(): React.JSX.Element {
  const openBottomSheet = useBottomSheet((state) => state.setIsOpen);
  const setBottomSheetView = useBottomSheet((state) => state.setActiveView);
  const categories = useCategoriesState((state) => state.categories);
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