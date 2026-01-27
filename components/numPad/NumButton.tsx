import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
} from 'react-native';

import {
  NumPadSymbol,
  NumPadButtonSizes,
  numButtonTypes,
} from '@/components/numPad/types';

type NumButtonProps<T> = T extends numButtonTypes.input 
 ? {
  size: NumPadButtonSizes;
  onPress: (val: NumPadSymbol) => void;
  value: NumPadSymbol;
  children: React.ReactNode;
  customStyle: StyleProp<View>;
} : {
  size: NumPadButtonSizes;
  onPress: (val?: undefined) => void;
  children: React.ReactNode;
  value?: undefined;
  customStyle: StyleProp<View>;
}

function NumButton<T>({
  onPress,
  value,
  children,
  size,
  customStyle = {},
}: NumButtonProps<T>): React.JSX.Element {
  const handlePress = () => onPress(value);

  return (
    <Pressable onPress={handlePress} style={[NumButtonStyles[size], NumButtonStyles.button]}>
      <View style={[NumButtonInnerStyles.inner, NumButtonInnerStyles[size], customStyle]}>
        {children}
      </View>
    </Pressable>
  )
}

const NumButtonInnerStyles = StyleSheet.create({
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F5',
  },
  wide: {
    flex: 2,
    borderRadius: 100,
  },
  default: {
    flex: 1,
    borderRadius: '50%',
  },
  big: {
    flex: 2,
    borderRadius: 100,
  }
})

const NumButtonStyles = StyleSheet.create({
  button: {
    display: 'flex',
    margin: 5,
    marginHorizontal: 10,
  },
  wide: {
    flex: 2,
  },
  default: {
    flex: 1,
  },
  big: {
    flex: 2,
  }
})

export { NumButton };