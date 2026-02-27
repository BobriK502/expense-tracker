import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  numButtons,
} from '@/components/numPad/config.ui';
import {
  NumButton,
} from '@/components/numPad/NumButton';
import {
  numButtonTypes,
  NumPadSymbol,
} from '@/components/numPad/types';
import {
  Colors,
} from '@/constants/Colors';

interface NumPadProps {
  onAddSymbol: (symbol: NumPadSymbol) => void;
  onClear: () => void;
  onRemoveSymbol: () => void;
  onSubmit: () => void;
}

function NumPad({
  onAddSymbol,
  onClear,
  onRemoveSymbol,
  onSubmit,
}: NumPadProps): React.JSX.Element {
  return (
    <View style={NumPadStyles.container}>
      <View style={NumPadStyles.inputsContainer}>
        {numButtons.map((group) => {
          return (
            <View style={NumPadStyles.inputsGroup}>
              {group.map((button) => {
                return (
                  <NumButton
                    <numButtonTypes.input>
                    value={button.value}
                    size={button.size}
                    onPress={onAddSymbol}
                    customStyle={{}}
                  >
                    <Text style={{ fontSize: 24, fontWeight: 400  }}>{button.value}</Text>
                  </NumButton>
                );
              })}
            </View>
          )
        })}
      </View>
      <View style={NumPadStyles.controlsContainer}>
        <NumButton
          onPress={onRemoveSymbol}
          size='default'
          customStyle={{ backgroundColor: Colors.unthemed.accents.rose }}
        >
          <Feather name="delete" size={24} color='black' />
        </NumButton>
        <NumButton
          onPress={onClear}
          size='default'
          customStyle={{ backgroundColor: Colors.unthemed.accents.blue }}
        >
          <Text style={{ fontSize: 22 }}>AC</Text>
        </NumButton>
        <NumButton
          onPress={onSubmit}
          size='big'
          customStyle={{ backgroundColor: Colors.unthemed.accents.green }}
        >
          <Feather name="check" size={24} color='black' />
        </NumButton>
      </View>
    </View>
  );
}

const NumPadStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputsContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  inputsGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});

export { NumPad };