import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type LegendItemProps = {
  name: string;
  color: string;
};

function LegendItem({
  name,
  color,
}: LegendItemProps): React.JSX.Element {
  return (
    <View style={LegendItemStyles.container}>
      <View style={[LegendItemStyles.dot, { backgroundColor: color }]} />
      <Text style={LegendItemStyles.label}>{name}</Text>
    </View>
  );
}

const LegendItemStyles = StyleSheet.create({
  container: {
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: '50%',
    marginRight: 5,
  },
  label: {
    fontSize: 14,
  }
});

export { LegendItem };
