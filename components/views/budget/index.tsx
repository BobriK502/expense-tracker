import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import InfoTile from '@/components/tiles/InfoTile/index';
import { DonutChart } from '@/components/charts/donutChart';

import { InfoTileTypes } from '@/components/tiles/InfoTile/IInfoTile';

function Budget() {
  return (
    <View>
      <View className='mb-5 bg-white rounded-3xl mx-5 shadow-md shadow-slate-600 h-96 flex felx-col justify-center items-center'>
        <Text className='text-2xl font-light mb-8'>Expences</Text>
        <View className='flex-row'>
          <MaterialIcons name="warning-amber" size={18} />
          <Text className='color-slate-600 pl-2'>Coming soon..</Text>
        </View>
      </View>
      <View className='mb-5 bg-white rounded-3xl mx-5 shadow-md shadow-slate-600 h-96 flex felx-col justify-center items-center'>
        <Text className='text-2xl font-light mb-8'>Expences</Text>
        <View className='flex-row'>
          <MaterialIcons name="warning-amber" size={18} />
          <Text className='color-slate-600 pl-2'>Coming soon..</Text>
        </View>
      </View>
      <View className='mb-5 bg-white rounded-3xl mx-5 shadow-md shadow-slate-600 h-96 flex felx-col justify-center items-center'>
        <Text className='text-2xl font-light mb-8'>Expences</Text>
        <View className='flex-row'>
          <MaterialIcons name="warning-amber" size={18} />
          <Text className='color-slate-600 pl-2'>Coming soon..</Text>
        </View>
      </View>
    </View>
  );
}

export { Budget };