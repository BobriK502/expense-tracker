import Animated, {
  interpolateColor,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  Pressable,
} from 'react-native';
import React, {
  useEffect,
} from 'react';
import {
  TRANSACTION_TYPE_IDS,
} from '@/constants/config.entities';
import {
  FontAwesome6,
} from '@expo/vector-icons';

import {
  Colors,
} from '@/constants/Colors';
import {
  useColorScheme,
} from '@/hooks/useColorScheme';

import {
  type TransactionType,
  type TransactionId,
} from '@/types/ui/transaction/transactionType';

interface TransactionSwitchProps {
  onChange: (id: TransactionId) => void;
  selectedValue: TransactionId;
  values: Array<TransactionType>;
}

function TransactionSwitch({
  onChange,
  selectedValue,
  values,
}: TransactionSwitchProps): React.JSX.Element {
  const optionBinVal = useSharedValue(0);
  const colorScheme = useColorScheme();
  const slectedColorScheme = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    const opositeOption = values.find((v) => v.id !== selectedValue)!;
    onChange(opositeOption.id);
  }

  useEffect(() => {
    const newOptionBinVal = Number(
      selectedValue === TRANSACTION_TYPE_IDS.INCOME,
    );

    if (optionBinVal.value !== newOptionBinVal) {
      optionBinVal.value = withTiming(newOptionBinVal, { duration: 400 });
    }
  }, [selectedValue]);

  const rotateStyle = useAnimatedStyle(() => {
    const rotateDeg = interpolate(
      optionBinVal.value,
      [0, 0.8, 1],
      [0, 190, 180],
    );

    return {
      transform: [{ rotateZ: `${rotateDeg}deg` }]
    }
  });

  const iconColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      optionBinVal.value,
      [0, 1],
      [
        slectedColorScheme.transaction[TRANSACTION_TYPE_IDS.EXPENCE],
        slectedColorScheme.transaction[TRANSACTION_TYPE_IDS.INCOME],
      ],
    );

    return {
      backgroundColor: color,
    }
  });

  return (
    <Pressable
      onPress={handlePress}
      style={{
        height: 30,
        width: 30,
        borderRadius: '50%',
      }}
    >
      <Animated.View style={[
        rotateStyle,
        iconColor,
        {
          height: 25,
          width: 25,
          borderRadius: '50%',
          position: 'relative',
          opacity: 0.8,
        }
      ]}>
        <Animated.View style={{
          position: 'absolute', top: 0,
          height: 20,
          right: 2.5,
          width: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <FontAwesome6 name='sort-down' color={'white'} size={14} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

export { TransactionSwitch };