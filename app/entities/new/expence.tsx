import { View } from 'react-native';
import React from 'react';
import {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
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
    <View style={{
      height: '100%',
      width: '100%',
      backgroundColor: '#fafafa',
    }}
    >
      <View style={{
        backgroundColor: '#fecdd3',
        height: 96,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'absolute',
        shadowColor: '#ffe4e6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        elevation: 2,
      }}>
        <BackButton style={{
          position: 'absolute',
          top: 40,
          left: 16,
          color: '#cbd5e1',
        }} />
      </View>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 64, }} />
        <ExpenceForm
          headerStyle={headerStyle}
          onSubmit={onSubmit}
          record={defaultValues}
        />
      </KeyboardAwareScrollView>
    </View>

  );
}