import { View } from 'react-native';
import React from 'react';

import { SettingsCategoriesList } from '@/components/views/more/categories/index';

export default function (): React.JSX.Element {
  return (
    <View
      style={{
        backgroundColor: '#bae6fd',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <SettingsCategoriesList />
    </View>
  );
}