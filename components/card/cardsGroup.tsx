import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface CardGroupProps {
  title: string;
  children: React.ReactNode;
}

function CardGroup({
  title,
  children,
}: CardGroupProps): React.JSX.Element {
  return (
    <View style={styles.group}>
      <View style={styles.titleContainer}>
        <Text style={styles.titile}>{title}</Text>
      </View>
      <View style={styles.innerContainer}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    display: 'flex',
    marginTop: 15,
    width: '100%',
  },
  titile: {
    paddingLeft: 14,
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: 400,
    color: 'gray',
    borderBottomWidth: 0.2,
    borderColor: 'lightgray'
  },
  titleContainer: {
    marginLeft: 3,
  },
  innerContainer: {
    marginTop: 5,
  }
});

export { CardGroup };
