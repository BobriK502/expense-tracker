import { View, Text } from 'react-native';
import React from 'react';

import { SettingsCategoriesList } from '@/components/views/more/categories/index';

export default function (): React.JSX.Element {
  return (
    <View className='bg-sky-200 h-full w-full justify-center items-center'>
      <SettingsCategoriesList />
    </View>
  );
}