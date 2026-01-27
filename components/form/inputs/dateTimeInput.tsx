import DatePicker from 'react-native-date-picker';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { getText } from '@/services/localization';
import { Feather } from '@expo/vector-icons';

const TYPES = {
  date: 'date',
  time: 'time',
};

function DateTimeInput({
  name,
  defaultValue,
  control,
}): React.JSX.Element {
  const { field } = useController({
    control,
    name,
    defaultValue,
  });

  const [isOpen, setIsOpen] = useState(false);

  const dateValue = useMemo(() => {
    const dateVal = new Date(field.value);
    return dateVal
      .toLocaleDateString('ru-RU', { year: "numeric", month: "short", day: "numeric" });
  }, [field.value])

  const timeValue = useMemo(() => {
    return new Date(field.value)
      .toLocaleTimeString('ru-RU', { hour: "2-digit", minute: "2-digit" });
  }, [field.value])

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(true)}>
        <View style={styles.button}>
          <View style={styles.buttonIcon}>
            <Feather name="calendar" size={16} color="white" />
          </View>
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>{dateValue}</Text>
            <Text style={styles.buttonText}>{timeValue}</Text>
          </View>
        </View>
      </Pressable>
      <DatePicker
        date={field.value}
        modal
        mode={"datetime"}
        open={isOpen}
        onConfirm={(selectedDate) => {
          field.onChange(new Date(selectedDate));
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
        cancelText={getText('datepicker_cancel')}
        confirmText={getText('datepicker_confirm')}
        title={"Date"}
        locale='ru'
        is24hourSource='locale'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#2A2524"
  },
  buttonIcon: {
    padding: 8,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: 'white',
  },
  buttonInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 400,
  }
});

export { DateTimeInput };