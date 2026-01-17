import DatePicker from 'react-native-date-picker';
import { Pressable, View, Text, TouchableHighlight } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { getText } from '@/services/localization';

const TYPES = {
  date: 'date',
  time: 'time',
};

function DateTimeInput({name, defaultValue, label, type,  control}): React.JSX.Element {
   const { field } = useController({
     control,
     name,
     defaultValue,
   });

   const displayDate = useMemo(() => {
    const dateVal = new Date(field.value);

    if (type === TYPES.date) {
      return `${dateVal.getDay()} ${getText(`month_${dateVal.getMonth()}`)}`
    }
    
    return `${dateVal.getHours()}:${dateVal.getMinutes()}`
   }, [field.value])

   const icon = useMemo(() => {
      return type === TYPES.date ? 'calendar-month' : 'alarm';
   }, [type])

   const [isOpen, setIsOpen] = useState(false)
 
  return (
    <View className='m-4 w-36'>
      <View className='ml-2'>
        <Text className='mb-2 text-md font-light color-neutral-800'>{label}</Text>
      </View>
      <TouchableHighlight
        onPress={() => setIsOpen(true)}
        className='flex-row items-end pr-4 bg-white rounded-lg shadow-black shadow-xl'
        underlayColor="lightblue"
      >
        <>
          <View className='px-2 py-2 bg-neutral-200 rounded-l-md'>
            <MaterialIcons name={icon} size={20} />
          </View>
          <Text className='text-md py-2 color-neutral-800 ml-3 font-normal'>{displayDate}</Text>
        </>
      </TouchableHighlight>
        
     <DatePicker
       date={field.value}
       modal
       mode={type}
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
  );
}

export { DateTimeInput, TYPES };