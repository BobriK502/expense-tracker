import { TextInput, View, Text } from 'react-native';
import React from 'react';
import { useController } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';


function FormTextInput({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  icon = null,
}): React.JSX.Element {
  const { field } = useController({
    control,
    name,
    defaultValue,
  });

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
    }}>
      <Text className='ml-2 mb-2 text-lg font-lght color-black'>{label}</Text>
      <View style={{ flexDirection: 'row'}}>
        {Boolean(icon) && (
          <View style={{
            position: 'absolute',
            left: 6,
            top: 0,
            width: 25,
            height: 45,
            paddingTop: 11,
            zIndex: 2,
          }}>
            <MaterialIcons name={icon} size={25} />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          style={{
            height: multiline ? numberOfLines * 45 : 45,
            width: '100%',
            textAlignVertical: multiline ? 'top' : 'auto',
            paddingTop: multiline ? 15 : 0,
            borderWidth: 1,
            paddingRight: 10,
            paddingLeft: Boolean(icon) ? 35 : 10,
            elevation: 5,
            color: '#1e293b',
            backgroundColor: 'white',
          }}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onChangeText={field.onChange}
          value={field.value}
          className=' text-md rounded-xl focus:border-blue-400 border-white color-slate-800'
        />
      </View>

    </View>
  );
}

export { FormTextInput };