import {
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';


function FormSumInput({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  icon = null,
  currency = null,
}): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const { field } = useController({
    control,
    name,
    defaultValue,
  });

  return (
    <View className='flex-col mx-5 mt-4 w-full px-8'>
      <Text className='ml-2 mb-2 text-lg font-lght color-black'>{label}</Text>
      <View className='flex-row items-end'>
        {Boolean(icon) && (
          <View style={{
            position: 'absolute',
            left: 10,
            top: 11,
            zIndex: 2,
          }}>
            <MaterialIcons name={icon} size={22} />
          </View>
        )}
        <TextInput
          style={[
            {
              paddingLeft: Boolean(icon) ? 40 : 10,
            },
            styles.input,
            isFocused && styles.inputFocused,
          ]}
          keyboardType='numeric'
          placeholder={placeholder}
          onChangeText={field.onChange}
          value={field.value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {Boolean(currency) && (
          <View style={{ position: 'absolute', right: 20, top: 12 }}>
            <Text style={{ fontWeight: 500 }}>{currency}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    borderRadius: 12,
    color: '#475569',
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    width: '100%',
    height: 45,
    borderWidth: 1,
  },
  inputFocused: {
    borderColor: '#60a5fa',
  },
});

export { FormSumInput };