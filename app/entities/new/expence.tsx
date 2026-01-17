import { View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useSharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { createExpence } from '@/db/transactions/index';
import { BackButton } from '@/components/buttons/back';
import { ExpenceForm } from '@/components/form/entities/expence/expenceForm';

export default function (): React.JSX.Element {
  const scrollY = useSharedValue(0);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    scrollY.value = y;
  };

  const a = useMemo(() => {
    return scrollY.value;
  }, [scrollY.value]);


  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 40],
      [1, 0],
    );

    return {
      opacity,
    };
  }, [scrollY.value]);

  const onSubmit = async (data) => {
    await createExpence({
      title: data.title,
      date: data.date,
      amount: data.amount,
      notice: data.notice,
      categoryId: data.categoryId,
    });
  }

  const defaultValues = {
    title: '',
    date: new Date(),
    amount: 0,
    notice: '',
    categoryId: null,
  }

  return (
    <View className='h-full w-full bg-neutral-50'>
      <View className='bg-rose-200 h-24 w-full flex-col justify-end absolute z-10 shadow-rose-100 shadow-xs'>
        <BackButton className='absolute top-10 left-4 color-slate-200' />
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View className='h-16' />
        <ExpenceForm
          headerStyle={headerStyle}
          onSubmit={onSubmit}
          record={defaultValues}
        />
      </KeyboardAwareScrollView>
    </View>

  );
}