import React, { useState, useMemo } from 'react';

import DatePicker from 'react-native-date-picker';
import { Pressable, View, Text, TouchableHighlight } from 'react-native';
import { useController } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { getText } from '@/services/localization';
import Animated, {
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

function ExpenceFormHeader({
  name,
  defaultValue,
  label,
  control,
  headerStyle,
}): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const { field } = useController({
    control,
    name,
    defaultValue,
  });


  const displayData = useMemo(() => {
    const dateVal = new Date(field.value);

    return {
      time: `${dateVal.getHours()}:${dateVal.getMinutes()}`,
      date: `${dateVal.getDate()} ${getText(`month_${dateVal.getMonth()}`)}`,
    }
  }, [field.value])

  return (
    <View style={{
      height: 200,
      backgroundColor: '#fecdd3',
      position: 'relative',
      width: '100%',
      }}>
      <Pressable
        onPress={() => setIsOpen(true)}
        style={{ position: 'absolute', bottom: 20, left: 24 }}
      >
        <View style={{ flexDirection: 'column' }}>
          <Animated.View
            style={[
              headerStyle,
              {
                flexDirection: 'row',
                alignItems: 'center'
              }
            ]}
          >
            <MaterialIcons name={"calendar-month"} size={32} />
            <Text style={{ fontSize: 48, fontWeight: 300, paddingTop: 4 }}>
              {displayData.date}
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              headerStyle,
              {
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 4,
              }
            ]}
          >
            <MaterialIcons name={"alarm"} size={20} />
            <Text style={{ fontWeight: 200, fontSize: 18, marginLeft: 8}}>
              {displayData.time}
            </Text>
          </Animated.View>
        </View>


      </Pressable>
      <DatePicker
        date={field.value}
        modal
        mode="datetime"
        open={isOpen}
        onConfirm={(selectedDate) => {
          field.onChange(new Date(selectedDate));
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
        cancelText={getText('datepicker_cancel')}
        confirmText={getText('datepicker_confirm')}
        title={label}
        locale='ru'
        is24hourSource='locale'
      />
    </View>
  )
}

export { ExpenceFormHeader };