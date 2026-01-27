import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
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
    <View style={TextInputStyles.container}>
      <View style={{ flexDirection: 'row'}}>
        {Boolean(icon) && (
          <View style={TextInputStyles.icon}>
            <MaterialIcons name={icon} size={25} />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          style={{
            height: multiline ? 'auto' : 40,
            minHeight: 40,
            maxHeight: multiline ? numberOfLines * 40 : 40,
            textAlignVertical: multiline ? 'top' : 'auto',
            paddingTop: multiline ? 11 : 0,
            paddingLeft: Boolean(icon) ? 35 : 10,
          }}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onChangeText={field.onChange}
          value={field.value}
        />
      </View>
    </View>
  );
}

const TextInputStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 5,
  },
  icon: {
    position: 'absolute',
    left: 6,
    top: -2,
    width: 25,
    height: 35,
    paddingTop: 11,
    zIndex: 2,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    paddingRight: 10,
    elevation: 5,
    color: '#1e293b',
    backgroundColor: 'white',
  }
})

export { FormTextInput };